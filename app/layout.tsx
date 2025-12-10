import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pension Policy Proposal Generator",
  description: "Generate and edit pension policy proposals in Bengali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${notoSansBengali.variable} antialiased`}
        style={{ fontFamily: "Noto Sans Bengali, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
