import type { Metadata } from "next";
import Image from "next/image";
import { BACKGROUND_COLOR, LOGO_PATH, THEME_COLOR } from "@/lib/pwa-config";

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
        backgroundColor: BACKGROUND_COLOR,
        color: "#1a1a1a",
        textAlign: "center",
      }}
    >
      <Image
        src={LOGO_PATH}
        alt=""
        width={96}
        height={96}
        priority
        style={{ marginBottom: 24, objectFit: "contain" }}
      />
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
          backgroundColor: THEME_COLOR,
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
