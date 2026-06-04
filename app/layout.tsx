import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import PwaSplash from "@/components/pwa-splash";
import { SerwistProvider } from "@/components/serwist-provider";
import {
  APP_DESCRIPTION,
  APP_NAME,
  BACKGROUND_COLOR,
  LOGO_PATH,
  THEME_COLOR,
} from "@/lib/pwa-config";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: LOGO_PATH, type: "image/png", sizes: "512x512" }],
    apple: [{ url: LOGO_PATH, type: "image/png", sizes: "512x512" }],
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link
          rel="apple-touch-startup-image"
          href="/splash"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splash"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link rel="apple-touch-startup-image" href="/splash" />
      </head>
      <body
        className={`${notoSansBengali.variable} antialiased`}
        style={{
          fontFamily: "Noto Sans Bengali, sans-serif",
          backgroundColor: BACKGROUND_COLOR,
        }}
      >
        <SerwistProvider swUrl="/serwist/sw.js">
          <PwaSplash />
          {children}
        </SerwistProvider>
      </body>
    </html>
  );
}
