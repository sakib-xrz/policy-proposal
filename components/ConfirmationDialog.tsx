"use client";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel = "নিশ্চিত করুন",
  cancelLabel = "বাতিল করুন",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-message"
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        padding: "20px",
        display: "grid",
        placeItems: "center",
        backgroundColor: "rgba(15, 23, 42, 0.65)",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "24px",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          fontFamily: "Noto Sans Bengali, sans-serif",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: "52px",
            height: "52px",
            margin: "0 auto 16px",
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            backgroundColor: danger ? "#fef2f2" : "#eff6ff",
            color: danger ? "#dc2626" : "#2563eb",
            fontSize: "26px",
            fontWeight: "700",
          }}
        >
          {danger ? "!" : "?"}
        </div>
        <h2
          id="confirmation-title"
          style={{ margin: 0, color: "#111827", fontSize: "22px" }}
        >
          {title}
        </h2>
        <p
          id="confirmation-message"
          style={{
            margin: "10px 0 22px",
            color: "#6b7280",
            fontSize: "15px",
            lineHeight: "1.6",
          }}
        >
          {message}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              minHeight: "48px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#374151",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              minHeight: "48px",
              border: 0,
              borderRadius: "8px",
              backgroundColor: danger ? "#dc2626" : "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
