export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function buildPreviewPdfFilename(industryId: string): string {
  const label = industryId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("_");
  return `${label}_Website_Preview.pdf`;
}
