import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/** Scale factor applied to all text when exporting to PDF (web view unchanged). */
const PDF_FONT_SCALE = 0.88;

function scaleFontSize(fontSize: string): string {
  const match = fontSize.match(/^([\d.]+)(px|pt|rem|em)$/);
  if (!match) return fontSize;
  const scaled = parseFloat(match[1]) * PDF_FONT_SCALE;
  const unit = match[2];
  return unit === "px"
    ? `${Math.round(scaled * 10) / 10}px`
    : `${scaled}${unit}`;
}

/**
 * Generates a multi-page PDF from a DOM element.
 * Captures the full content height and splits it into A4 pages.
 */
export async function generatePDF(
  elementId: string,
  filename: string = "policy-proposal.pdf"
) {
  let iframe: HTMLIFrameElement | null = null;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // A4 at 96 DPI: 794 × 1123 px
    const A4_WIDTH_PX = 794;
    const A4_HEIGHT_PX = 1123;

    // ------------------------------------------------------------------
    // Step 1: render in a hidden iframe to measure actual content height
    // ------------------------------------------------------------------
    iframe = document.createElement("iframe");
    iframe.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: ${A4_WIDTH_PX}px;
      height: ${A4_HEIGHT_PX}px;
      border: none;
      visibility: hidden;
    `;
    document.body.appendChild(iframe);

    await new Promise<void>((resolve) => {
      if (iframe) {
        iframe.onload = () => resolve();
        setTimeout(resolve, 100);
      }
    });

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) throw new Error("Cannot access iframe document");

    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #ffffff;
            color: #000000;
            font-family: 'Noto Sans Bengali', sans-serif;
            width: ${A4_WIDTH_PX}px;
            overflow: visible;
          }
          #content-inner {
            width: 100%;
            background: #ffffff;
            padding: 60px 80px;
            font-family: 'Noto Sans Bengali', sans-serif;
            line-height: 1.8;
            font-size: ${20 * PDF_FONT_SCALE}px;
            color: #000000;
          }
        </style>
      </head>
      <body>
        <div id="content-inner"></div>
      </body>
      </html>
    `);
    iframeDoc.close();

    if (iframe.contentWindow) {
      await iframe.contentWindow.document.fonts.ready;
    }

    const clone = element.cloneNode(true) as HTMLElement;
    const processElement = (el: HTMLElement) => {
      el.removeAttribute("class");
      if (!el.style.color) el.style.color = "#000000";
      if (el.style.fontSize) {
        el.style.fontSize = scaleFontSize(el.style.fontSize);
      }
      Array.from(el.children).forEach((child) => {
        if (child instanceof HTMLElement) processElement(child);
      });
    };
    processElement(clone);

    const contentInner = iframeDoc.getElementById("content-inner");
    if (!contentInner) throw new Error("Content wrapper not found in iframe");
    while (clone.firstChild) contentInner.appendChild(clone.firstChild);

    // Allow layout to settle
    await new Promise((resolve) => setTimeout(resolve, 600));

    // scrollHeight already includes #content-inner padding — do not add extra height
    const fullContentHeight = contentInner.scrollHeight;

    // Size iframe to content only (avoid minHeight stretching blank area onto a 2nd page)
    iframe.style.height = `${fullContentHeight}px`;

    await new Promise((resolve) => setTimeout(resolve, 200));

    // ------------------------------------------------------------------
    // Step 2: capture the full-height canvas
    // ------------------------------------------------------------------
    const canvas = await html2canvas(iframeDoc.body, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: A4_WIDTH_PX,
      height: fullContentHeight,
      windowWidth: A4_WIDTH_PX,
      windowHeight: fullContentHeight,
      foreignObjectRendering: false,
    });

    // Remove iframe now that we have the canvas
    if (iframe.parentNode) document.body.removeChild(iframe);
    iframe = null;

    // ------------------------------------------------------------------
    // Step 3: slice canvas into A4 pages, breaking only at blank rows
    //         so text lines and table rows are never cut in half.
    // ------------------------------------------------------------------
    const SCALE = 2;
    const PAGE_MARGIN_PX = 60 * SCALE;            // top + bottom margin (scaled)
    const canvasWidth = canvas.width;              // A4_WIDTH_PX * SCALE
    const canvasHeight = canvas.height;            // fullContentHeight * SCALE
    const pageHeightCanvas = A4_HEIGHT_PX * SCALE;
    // Usable content height per page after subtracting top + bottom margins
    const contentHeightPerPage = pageHeightCanvas - PAGE_MARGIN_PX * 2;

    // Read the full canvas pixels once to detect blank (background) rows
    const srcCtx = canvas.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    const pixels = srcCtx.getImageData(0, 0, canvasWidth, canvasHeight).data;

    // A row is "blank" when every sampled pixel is (near) white / transparent
    const isRowBlank = (y: number): boolean => {
      if (y < 0 || y >= canvasHeight) return false;
      const rowStart = y * canvasWidth * 4;
      for (let x = 0; x < canvasWidth; x += 2) {
        const i = rowStart + x * 4;
        const a = pixels[i + 3];
        if (a === 0) continue; // transparent counts as blank
        if (pixels[i] < 245 || pixels[i + 1] < 245 || pixels[i + 2] < 245) {
          return false;
        }
      }
      return true;
    };

    // Drop trailing blank rows so short documents (e.g. pension) don't get an empty page
    let effectiveCanvasHeight = canvasHeight;
    while (
      effectiveCanvasHeight > 0 &&
      isRowBlank(effectiveCanvasHeight - 1)
    ) {
      effectiveCanvasHeight--;
    }
    if (effectiveCanvasHeight === 0) effectiveCanvasHeight = canvasHeight;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    let currentY = 0;
    let pageIndex = 0;

    while (currentY < effectiveCanvasHeight) {
      if (pageIndex > 0) pdf.addPage();

      const idealEnd = currentY + contentHeightPerPage;
      let sliceEnd: number;

      if (idealEnd >= effectiveCanvasHeight) {
        sliceEnd = effectiveCanvasHeight;
      } else {
        // Search upward from the ideal boundary for a fully-blank row.
        // Keep at least 20% of the page filled so a single large
        // unbreakable block (e.g. the table) can be pushed to the next
        // page without leaving an almost-empty page behind it.
        let found = -1;
        const lowerBound = currentY + Math.floor(contentHeightPerPage * 0.2);
        for (let y = idealEnd; y >= lowerBound; y--) {
          if (isRowBlank(y)) {
            found = y;
            break;
          }
        }
        // Use the blank row if it makes forward progress, else hard cut
        sliceEnd = found > currentY ? found : idealEnd;
      }

      const sliceHeight = sliceEnd - currentY;

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvasWidth;
      pageCanvas.height = pageHeightCanvas;

      const ctx = pageCanvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasWidth, pageHeightCanvas);

      // Inset by top margin; remaining bottom space stays white
      ctx.drawImage(
        canvas,
        0, currentY, canvasWidth, sliceHeight,
        0, PAGE_MARGIN_PX, canvasWidth, sliceHeight
      );

      const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
      pdf.addImage(pageImgData, "PNG", 0, 0, 210, 297, undefined, "FAST");

      currentY = sliceEnd;
      pageIndex++;
    }

    pdf.save(filename);
  } catch (error) {
    if (iframe && iframe.parentNode) document.body.removeChild(iframe);
    console.error("PDF generation error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`PDF generation failed: ${msg}`);
  }
}
