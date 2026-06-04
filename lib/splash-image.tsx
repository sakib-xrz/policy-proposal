import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { APP_NAME, BACKGROUND_COLOR } from "@/lib/pwa-config";

async function getLogoDataUrl() {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const buffer = await readFile(logoPath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export async function createSplashImage(width: number, height: number) {
  const logoSrc = await getLogoDataUrl();
  const logoSize = Math.round(Math.min(width, height) * 0.28);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BACKGROUND_COLOR,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <img
          src={logoSrc}
          width={logoSize}
          height={logoSize}
          alt=""
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: Math.round(logoSize * 0.2),
            fontSize: Math.round(logoSize * 0.18),
            fontWeight: 600,
            color: "#28286E",
            letterSpacing: "-0.02em",
          }}
        >
          {APP_NAME}
        </div>
      </div>
    ),
    { width, height }
  );
}
