import { BUILDER_PREVIEW_CAPTURE_ID, PREVIEW_CAPTURE_SCALE } from "./constants";

export async function capturePreview(
  elementId = BUILDER_PREVIEW_CAPTURE_ID,
): Promise<HTMLCanvasElement> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Preview element not found.");
  }

  const frame = element.closest<HTMLElement>(".builder-preview__frame");
  const previousFrameWidth = frame?.style.width ?? "";
  const previousFrameMaxWidth = frame?.style.maxWidth ?? "";
  const previousMaxHeight = element.style.maxHeight;
  const previousOverflow = element.style.overflow;

  if (frame) {
    frame.style.width = "100%";
    frame.style.maxWidth = "100%";
  }
  element.style.maxHeight = "none";
  element.style.overflow = "visible";

  try {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const html2canvas = (await import("html2canvas")).default;

    return await html2canvas(element, {
      scale: PREVIEW_CAPTURE_SCALE,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#0c0c0c",
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });
  } finally {
    if (frame) {
      frame.style.width = previousFrameWidth;
      frame.style.maxWidth = previousFrameMaxWidth;
    }
    element.style.maxHeight = previousMaxHeight;
    element.style.overflow = previousOverflow;
  }
}
