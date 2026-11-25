"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { generatePDF } from "@/lib/pdfGenerator";
import {
  createDraftId,
  deletePolicyDraft,
  getPolicyDraft,
  PolicyId,
  savePolicyDraft,
} from "@/lib/policyDrafts";

interface PolicyEditorLayoutProps {
  policyId: PolicyId;
  title: string;
  defaultFilename: string;
  backHref?: string;
  children: React.ReactNode;
}

export default function PolicyEditorLayout({
  policyId,
  title,
  defaultFilename,
  backHref = "/",
  children,
}: PolicyEditorLayoutProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const activeDraftIdRef = useRef<string | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRestoringRef = useRef(false);

  const persistDraft = useCallback(
    (isAutomatic = false) => {
      const editor = document.getElementById("editable-document");
      if (!editor || isRestoringRef.current) return;

      const fields = Array.from(
        editor.querySelectorAll<HTMLElement>(".editable-field"),
      ).map((field) => field.textContent ?? "");
      if (fields.length === 0) return;

      const radioValues: Record<string, string> = {};
      editor
        .querySelectorAll<HTMLInputElement>('input[type="radio"]:checked')
        .forEach((radio) => {
          if (radio.name) radioValues[radio.name] = radio.value;
        });

      const rawName = fields[0]?.trim();
      const customerName =
        rawName && !/^\[.*\]$/.test(rawName) ? rawName : "নামহীন গ্রাহক";
      const id = activeDraftIdRef.current ?? createDraftId();
      activeDraftIdRef.current = id;

      savePolicyDraft({
        id,
        policyId,
        policyTitle: title,
        customerName,
        snapshot: { fields, radioValues },
      });

      const url = new URL(window.location.href);
      if (url.searchParams.get("draft") !== id) {
        url.searchParams.set("draft", id);
        window.history.replaceState({}, "", url);
      }

      setSaveStatus(
        isAutomatic ? "স্বয়ংক্রিয়ভাবে সংরক্ষিত" : "ড্রাফট সংরক্ষিত হয়েছে",
      );
    },
    [policyId, title],
  );

  useEffect(() => {
    const editor = document.getElementById("editable-document");
    if (!editor) return;

    const draftId = new URL(window.location.href).searchParams.get("draft");
    const draft = draftId ? getPolicyDraft(draftId) : undefined;

    if (draft && draft.policyId === policyId) {
      activeDraftIdRef.current = draft.id;
      isRestoringRef.current = true;

      Object.entries(draft.snapshot.radioValues).forEach(([name, value]) => {
        const radios = Array.from(
          editor.querySelectorAll<HTMLInputElement>(
            `input[type="radio"][name="${name}"]`,
          ),
        );
        radios.find((radio) => radio.value === value)?.click();
      });

      window.setTimeout(() => {
        const fields = editor.querySelectorAll<HTMLElement>(".editable-field");
        fields.forEach((field, index) => {
          if (draft.snapshot.fields[index] !== undefined) {
            field.textContent = draft.snapshot.fields[index];
          }
        });
        isRestoringRef.current = false;
        setSaveStatus("ড্রাফট পুনরুদ্ধার করা হয়েছে");
      }, 0);
    }

    const scheduleAutoSave = () => {
      if (isRestoringRef.current) return;
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(() => persistDraft(true), 800);
    };

    editor.addEventListener("input", scheduleAutoSave);
    editor.addEventListener("change", scheduleAutoSave);

    return () => {
      editor.removeEventListener("input", scheduleAutoSave);
      editor.removeEventListener("change", scheduleAutoSave);
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [persistDraft, policyId]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const documentContent = document.getElementById(
        "editable-document-content",
      );
      const nameElement = documentContent?.querySelector(
        ".editable-field",
      ) as HTMLElement;
      const name = nameElement?.textContent?.trim() || defaultFilename;
      const cleanName = name.replace(/,/g, "").trim();
      const filename = cleanName ? `${cleanName}.pdf` : defaultFilename;

      await generatePDF("editable-document-content", filename);

      if (
        activeDraftIdRef.current &&
        window.confirm("PDF তৈরি হয়েছে। এই ড্রাফটটি মুছে ফেলতে চান?")
      ) {
        deletePolicyDraft(activeDraftIdRef.current);
        activeDraftIdRef.current = null;
        const url = new URL(window.location.href);
        url.searchParams.delete("draft");
        window.history.replaceState({}, "", url);
        setSaveStatus("ড্রাফট মুছে ফেলা হয়েছে");
      }
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
          <div
            className="policy-editor-actions"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px",
            }}
          >
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {saveStatus && (
              <span
                className="policy-editor-save-status"
                style={{ color: "#16a34a", fontSize: "13px" }}
              >
                {saveStatus}
              </span>
            )}
            <button
              className="policy-editor-action-button"
              type="button"
              onClick={() => persistDraft(false)}
              style={{
                minHeight: "44px",
                padding: "10px 16px",
                border: "1px solid #2563eb",
                borderRadius: "6px",
                backgroundColor: "#ffffff",
                color: "#2563eb",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              ড্রাফট সংরক্ষণ করুন
            </button>
            <button
              className="policy-editor-action-button"
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              style={{
                minHeight: "44px",
                padding: "10px 16px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                cursor: isGenerating ? "not-allowed" : "pointer",
                opacity: isGenerating ? 0.6 : 1,
                fontFamily: "inherit",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {isGenerating ? "PDF তৈরি হচ্ছে..." : "PDF ডাউনলোড করুন"}
            </button>
          </div>
        </div>

        {/* Document */}
        <div id="editable-document">{children}</div>
      </div>
    </div>
  );
}
