"use client";

import Link from "next/link";

const policies = [
  {
    href: "/pension",
    title: "পেনশন পলিসি প্রস্তাব",
    subtitle: "Pension Policy",
    description: "আজীবন পেনশনের জন্য নিরাপদ বিনিয়োগ পরিকল্পনা।",
    icon: (
      <svg
        style={{ width: "40px", height: "40px", color: "#2563eb" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    href: "/sisu-nirapotta",
    title: "শিশু নিরাপত্তা বীমা",
    subtitle: "Sisu Nirapotta Policy (with profit)",
    description: "শিশুর ভবিষ্যৎ সুরক্ষায় লাভজনক বীমা পরিকল্পনা।",
    icon: (
      <svg
        style={{ width: "40px", height: "40px", color: "#16a34a" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    href: "/marriage-endowment",
    title: "ম্যারেজ এন্ডাওমেন্ট পলিসি (লাভসহ)",
    subtitle: "Marriage Endowment Policy (with profit)",
    description: "বিয়ের ভবিষ্যৎ সঞ্চয়ের জন্য লাভজনক বীমা পরিকল্পনা।",
    icon: (
      <svg
        style={{ width: "40px", height: "40px", color: "#db2777" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
    ),
  },
  {
    href: "/three-instalment",
    title: "৩ কিস্তি বীমা (লাভসহ)",
    subtitle: "Three Instalment Policy (with profit)",
    description: "মেয়াদকালে ৩ কিস্তিতে অর্থ প্রাপ্তির সুবিধাজনক বীমা পরিকল্পনা।",
    icon: (
      <svg
        style={{ width: "40px", height: "40px", color: "#8b5cf6" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "60px 20px",
        fontFamily: "Noto Sans Bengali, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#1a1a1a",
              margin: "0 0 8px 0",
            }}
          >
            পলিসি প্রস্তাব
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280", margin: 0 }}>
            একটি পলিসি বেছে নিন
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {policies.map((policy) => (
            <Link
              key={policy.href}
              href={policy.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "32px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, transform 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.06)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                }}
              >
                <div>{policy.icon}</div>
                <div>
                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {policy.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                      margin: "0 0 10px 0",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {policy.subtitle}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#6b7280",
                      margin: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    {policy.description}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "14px",
                    color: "#2563eb",
                    fontWeight: "600",
                  }}
                >
                  <span>প্রস্তাব তৈরি করুন</span>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
