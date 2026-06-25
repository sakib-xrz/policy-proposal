"use client";

import { useState } from "react";
import Link from "next/link";
import { generatePDF } from "@/lib/pdfGenerator";

interface PolicyEditorLayoutProps {
  title: string;
  defaultFilename: string;
  backHref?: string;
  children: React.ReactNode;
}

export default function PolicyEditorLayout({
  title,
  defaultFilename,
  backHref = "/",
  children,
}: PolicyEditorLayoutProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const documentContent = document.getElementById(
        "editable-document-content"
      );
      const nameElement = documentContent?.querySelector(
        ".editable-field"
      ) as HTMLElement;
      const name = nameElement?.textContent?.trim() || defaultFilename;
      const cleanName = name.replace(/,/g, "").trim();
      const filename = cleanName ? `${cleanName}.pdf` : defaultFilename;

      await generatePDF("editable-document-content", filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px 20px",
        fontFamily: "Noto Sans Bengali, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href={backHref}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "14px",
                color: "#6b7280",
                textDecoration: "none",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#6b7280";
              }}
            >
              <svg
                style={{ width: "16px", height: "16px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>ফিরে যান</span>
            </Link>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "6px",
              border: "none",
              cursor: isGenerating ? "not-allowed" : "pointer",
              opacity: isGenerating ? 0.6 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
              }
            }}
            onMouseLeave={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }
            }}
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                PDF তৈরি হচ্ছে...
              </>
            ) : (
              <>
                <svg
                  style={{ width: "20px", height: "20px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                PDF ডাউনলোড করুন
              </>
            )}
          </button>
        </div>

        {/* Document */}
        <div id="editable-document">{children}</div>
      </div>
    </div>
  );
}
