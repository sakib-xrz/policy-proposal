import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "অফলাইন",
};

export default function OfflinePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        fontFamily: "Noto Sans Bengali, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#1a1a1a",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: "linear-gradient(145deg, #2563eb 0%, #1d4ed8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 12px" }}>
        আপনি অফলাইনে আছেন
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "#525252",
          maxWidth: 360,
          lineHeight: 1.6,
          margin: "0 0 24px",
        }}
      >
        ইন্টারনেট সংযোগ পুনরুদ্ধার করুন, তারপর পেজ রিফ্রেশ করুন।
      </p>
      <a
        href="/"
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          fontWeight: 600,
          padding: "12px 24px",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 15,
        }}
      >
        আবার চেষ্টা করুন
      </a>
    </main>
  );
}
