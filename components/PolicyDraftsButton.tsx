"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {
  deleteAllPolicyDrafts,
  deletePolicyDraft,
  DRAFTS_CHANGED_EVENT,
  getPolicyDrafts,
  PolicyDraft,
  PolicyId,
} from "@/lib/policyDrafts";

interface PolicyDraftsButtonProps {
  policyId: PolicyId;
  policyHref: string;
  policyTitle: string;
}

export default function PolicyDraftsButton({
  policyId,
  policyHref,
  policyTitle,
}: PolicyDraftsButtonProps) {
  const [drafts, setDrafts] = useState<PolicyDraft[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<
    { type: "single"; draft: PolicyDraft } | { type: "all" } | null
  >(null);

  const refreshDrafts = useCallback(() => {
    setDrafts(getPolicyDrafts(policyId));
  }, [policyId]);

  useEffect(() => {
    const initialRefresh = window.setTimeout(refreshDrafts, 0);
    window.addEventListener(DRAFTS_CHANGED_EVENT, refreshDrafts);
    window.addEventListener("storage", refreshDrafts);

    return () => {
      window.clearTimeout(initialRefresh);
      window.removeEventListener(DRAFTS_CHANGED_EVENT, refreshDrafts);
      window.removeEventListener("storage", refreshDrafts);
    };
  }, [refreshDrafts]);

  if (drafts.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          zIndex: 2,
          padding: "6px 10px",
          border: "1px solid #bfdbfe",
          borderRadius: "999px",
          backgroundColor: "#eff6ff",
          color: "#1d4ed8",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        সংরক্ষিত ড্রাফট ({drafts.length.toLocaleString("bn-BD")})
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${policyTitle} সংরক্ষিত ড্রাফট`}
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.55)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "560px",
              maxHeight: "82vh",
              overflow: "auto",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                padding: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
              }}
            >
              <div>
                <h2 style={{ margin: 0, color: "#111827", fontSize: "20px" }}>
                  সংরক্ষিত ড্রাফট
                </h2>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "#6b7280",
                    fontSize: "13px",
                  }}
                >
                  {policyTitle}
                </p>
              </div>
              <button
                type="button"
                aria-label="বন্ধ করুন"
                onClick={() => setIsOpen(false)}
                style={{
                  width: "40px",
                  height: "40px",
                  border: 0,
                  borderRadius: "50%",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  cursor: "pointer",
                  fontSize: "22px",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "14px", display: "grid", gap: "10px" }}>
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  style={{
                    padding: "14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <strong
                    style={{ display: "block", color: "#111827", fontSize: "16px" }}
                  >
                    {draft.customerName} — {draft.policyTitle}
                  </strong>
                  <span
                    style={{
                      display: "block",
                      marginTop: "5px",
                      color: "#6b7280",
                      fontSize: "12px",
                    }}
                  >
                    সর্বশেষ সংরক্ষণ: {new Date(draft.updatedAt).toLocaleString("bn-BD")}
                  </span>
                  <div
                    style={{
                      marginTop: "12px",
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "8px",
                    }}
                  >
                    <Link
                      href={`${policyHref}?draft=${encodeURIComponent(draft.id)}`}
                      style={{
                        minHeight: "42px",
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "7px",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "700",
                        textDecoration: "none",
                      }}
                    >
                      ড্রাফট খুলুন
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPendingDelete({ type: "single", draft })}
                      style={{
                        minHeight: "42px",
                        padding: "0 14px",
                        border: "1px solid #fecaca",
                        borderRadius: "7px",
                        backgroundColor: "#ffffff",
                        color: "#dc2626",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: "600",
                      }}
                    >
                      মুছুন
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "0 14px 18px" }}>
              <button
                type="button"
                onClick={() => setPendingDelete({ type: "all" })}
                style={{
                  width: "100%",
                  minHeight: "46px",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  backgroundColor: "#fef2f2",
                  color: "#b91c1c",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                সব ড্রাফট মুছুন
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmationDialog
        open={pendingDelete !== null}
        title={
          pendingDelete?.type === "all"
            ? "সব ড্রাফট মুছবেন?"
            : "ড্রাফট মুছবেন?"
        }
        message={
          pendingDelete?.type === "all"
            ? "এই পলিসির সব সংরক্ষিত ড্রাফট স্থায়ীভাবে মুছে যাবে।"
            : pendingDelete?.type === "single"
              ? `${pendingDelete.draft.customerName}–এর ড্রাফটটি স্থায়ীভাবে মুছে যাবে।`
              : ""
        }
        confirmLabel="মুছে ফেলুন"
        danger
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete?.type === "single") {
            deletePolicyDraft(pendingDelete.draft.id);
          } else if (pendingDelete?.type === "all") {
            deleteAllPolicyDrafts(policyId);
            setIsOpen(false);
          }
          setPendingDelete(null);
          refreshDrafts();
        }}
      />
    </>
  );
}
