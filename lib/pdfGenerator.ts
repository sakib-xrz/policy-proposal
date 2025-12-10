import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Generates a PDF from a DOM element by capturing it as an image
 * Always renders at A4 dimensions regardless of device screen size
 * @param elementId - The ID of the element to capture
 * @param filename - The name of the PDF file to download
 */
export async function generatePDF(
  elementId: string,
  filename: string = "pension-policy-proposal.pdf"
) {
  let iframe: HTMLIFrameElement | null = null;

  try {
    // Get the element to capture
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // A4 dimensions at 96 DPI (standard screen DPI)
    // A4 = 210mm x 297mm = 8.27" x 11.69" = 794px x 1123px at 96 DPI
    const A4_WIDTH_PX = 794;
    const A4_HEIGHT_PX = 1123;

    // Create an isolated iframe with fixed A4 dimensions
    iframe = document.createElement("iframe");
    iframe.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: ${A4_WIDTH_PX}px;
      height: ${A4_HEIGHT_PX}px;
      border: none;
      overflow: hidden;
    `;
    document.body.appendChild(iframe);

    // Wait for iframe to be ready
    await new Promise<void>((resolve) => {
      if (iframe) {
        iframe.onload = () => resolve();
        setTimeout(resolve, 100);
      }
    });

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      throw new Error("Cannot access iframe document");
    }

    // Write minimal HTML with fixed A4 dimensions
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background: #ffffff;
            color: #000000;
            font-family: 'Noto Sans Bengali', sans-serif;
            width: ${A4_WIDTH_PX}px;
            min-height: ${A4_HEIGHT_PX}px;
            overflow: visible;
          }
          #content-wrapper {
            width: ${A4_WIDTH_PX}px;
            background: #ffffff;
          }
          #content-inner {
            width: 100%;
            background: #ffffff;
            padding: 60px 80px;
            font-family: 'Noto Sans Bengali', sans-serif;
            line-height: 1.8;
            font-size: 20px;
            color: #000000;
          }
        </style>
      </head>
      <body>
        <div id="content-wrapper">
          <div id="content-inner"></div>
        </div>
      </body>
      </html>
    `);
    iframeDoc.close();

    // Wait for fonts to load in iframe
    if (iframe.contentWindow) {
      await iframe.contentWindow.document.fonts.ready;
    }

    // Clone the content (not the wrapper div, just the inner content)
    const clone = element.cloneNode(true) as HTMLElement;

    // Remove classes and process element
    const processElement = (el: HTMLElement) => {
      // Remove class attribute to avoid any CSS variable references
      el.removeAttribute("class");

      // Ensure explicit styles
      if (!el.style.color) {
        el.style.color = "#000000";
      }

      // Process all children
      Array.from(el.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          processElement(child);
        }
      });
    };

    processElement(clone);

    // Get the inner content div and append our cloned content
    const contentInner = iframeDoc.getElementById("content-inner");
    if (!contentInner) {
      throw new Error("Content wrapper not found in iframe");
    }

    // Move all child nodes from clone to contentInner
    while (clone.firstChild) {
      contentInner.appendChild(clone.firstChild);
    }

    // Wait for rendering to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // Capture the entire body at fixed A4 dimensions
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2, // Higher quality (2x resolution)
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        windowWidth: A4_WIDTH_PX,
        windowHeight: A4_HEIGHT_PX,
        foreignObjectRendering: false,
      });

      // Get canvas dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // PDF dimensions (A4 in mm)
      const pdfWidth = 210; // mm
      const pdfHeight = 297; // mm

      // Calculate aspect ratios
      const canvasRatio = imgWidth / imgHeight;
      const pdfRatio = pdfWidth / pdfHeight;

      let finalWidth = pdfWidth;
      let finalHeight = pdfHeight;
      let marginX = 0;
      let marginY = 0;

      // Fit image to page while maintaining aspect ratio
      if (canvasRatio > pdfRatio) {
        // Image is wider - fit to width
        finalHeight = pdfWidth / canvasRatio;
        marginY = (pdfHeight - finalHeight) / 2;
      } else {
        // Image is taller - fit to height
        finalWidth = pdfHeight * canvasRatio;
        marginX = (pdfWidth - finalWidth) / 2;
      }

      // Convert canvas to image data
      const imgData = canvas.toDataURL("image/png", 1.0);

      // Create PDF document (A4 size, portrait orientation)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Add image to PDF
      pdf.addImage(
        imgData,
        "PNG",
        marginX,
        marginY,
        finalWidth,
        finalHeight,
        undefined,
        "FAST"
      );

      // Download the PDF
      pdf.save(filename);
    } finally {
      // Clean up: remove iframe
      if (iframe && iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    }
  } catch (error) {
    // Make sure to clean up iframe on error
    if (iframe && iframe.parentNode) {
      document.body.removeChild(iframe);
    }

    console.error("PDF generation error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`PDF generation failed: ${errorMessage}`);
  }
}
