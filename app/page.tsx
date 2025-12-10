"use client";

import { useState } from "react";
import EditableDocument from "@/components/EditableDocument";
import { generatePDF } from "@/lib/pdfGenerator";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);

  const initialData = {
    name: "ইউসরা মোহাম্মদ,",
    age: "৩৩",
    pensionStartAge: "৫৫",
    monthlyPension: "১,০০,০০০",
    annualPremium: "৩,৫৮,৮০০",
    depositPeriod: "২২",
    totalDeposit: "৭৮,৯৩,৬০০",
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(
        "editable-document-content",
        "pension-policy-proposal.pdf"
      );
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
        {/* Header */}
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
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            পেনশন পলিসি প্রস্তাব
          </h1>
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
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

        {/* Editable Document */}
        <div
          id="editable-document"
          style={{
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <EditableDocument initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
