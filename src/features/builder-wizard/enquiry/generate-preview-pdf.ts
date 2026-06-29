import { getOptionById } from "@/features/marketplace/catalog";
import { BUILDER_STYLES } from "../constants";
import { getIndustryBySlug } from "@/mock/industries";

export interface PreviewPdfMetadata {
  businessName: string;
  industryId: string;
  styleId: string;
  enabledSections: string[];
  selections: Record<string, string>;
  generatedDate: string;
}

function formatLabel(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getStyleLabel(styleId: string): string {
  return BUILDER_STYLES.find((style) => style.id === styleId)?.label ?? styleId;
}

function getIndustryLabel(industryId: string): string {
  return getIndustryBySlug(industryId)?.name ?? formatLabel(industryId);
}

function getTemplateLabel(sectionId: string, optionId: string): string {
  return getOptionById(optionId)?.name ?? formatLabel(optionId);
}

export async function generatePreviewPDF(
  metadata: PreviewPdfMetadata,
  previewCanvas: HTMLCanvasElement,
): Promise<Blob> {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  doc.setFillColor(12, 10, 18);
  doc.rect(0, 0, pageWidth, 46, "F");

  doc.setFillColor(147, 51, 234);
  doc.rect(margin, 14, 28, 2.5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("BhaiKiSite", margin, 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(210, 210, 220);
  doc.text("Website Preview", margin, 33);

  let y = 58;
  const lineHeight = 7;

  const rows: [string, string][] = [
    ["Business Name", metadata.businessName],
    ["Industry", getIndustryLabel(metadata.industryId)],
    ["Selected Style", getStyleLabel(metadata.styleId)],
    ["Selected Sections", metadata.enabledSections.map(formatLabel).join(", ")],
    [
      "Selected Templates",
      metadata.enabledSections
        .map((sectionId) => {
          const optionId = metadata.selections[sectionId];
          if (!optionId) return null;
          return `${formatLabel(sectionId)}: ${getTemplateLabel(sectionId, optionId)}`;
        })
        .filter(Boolean)
        .join(" · "),
    ],
    ["Generated Date", metadata.generatedDate],
  ];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 35);
  doc.text("Project Summary", margin, y);
  y += 10;

  for (const [label, value] of rows) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 100, 110);
    doc.text(label.toUpperCase(), margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(25, 25, 30);
    const wrapped = doc.splitTextToSize(value, contentWidth);
    doc.text(wrapped, margin, y + 4.5);
    y += 4.5 + wrapped.length * lineHeight;
  }

  y += 6;
  doc.setDrawColor(220, 220, 228);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 35);
  doc.text("Assembled Website Preview", margin, y);
  y += 8;

  const imgData = previewCanvas.toDataURL("image/jpeg", 0.92);
  const imgProps = doc.getImageProperties(imgData);
  const pdfImgHeight = (imgProps.height * contentWidth) / imgProps.width;
  let heightLeft = pdfImgHeight;
  let position = y;

  doc.addImage(imgData, "JPEG", margin, position, contentWidth, pdfImgHeight);
  heightLeft -= pageHeight - position;

  while (heightLeft > 0) {
    position = heightLeft - pdfImgHeight;
    doc.addPage();
    doc.addImage(imgData, "JPEG", margin, position, contentWidth, pdfImgHeight);
    heightLeft -= pageHeight;
  }

  return doc.output("blob");
}
