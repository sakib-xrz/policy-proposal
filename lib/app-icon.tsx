import { ImageResponse } from "next/og";

const BRAND = {
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  accent: "#3b82f6",
  paper: "#ffffff",
  ink: "#1e3a8a",
};

type IconVariant = "standard" | "maskable";

export function createAppIconImage(
  size: number,
  variant: IconVariant = "standard"
) {
  const isMaskable = variant === "maskable";
  const pad = isMaskable ? Math.round(size * 0.12) : 0;
  const inner = size - pad * 2;
  const radius = isMaskable ? Math.round(inner * 0.22) : Math.round(size * 0.22);
  const docW = Math.round(inner * 0.52);
  const docH = Math.round(inner * 0.62);
  const docX = pad + Math.round((inner - docW) / 2);
  const docY = pad + Math.round(inner * 0.2);
  const lineH = Math.max(3, Math.round(inner * 0.035));
  const lineGap = Math.round(lineH * 1.6);
  const penSize = Math.round(inner * 0.14);

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isMaskable
            ? BRAND.primary
            : `linear-gradient(145deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
        }}
      >
        <div
          style={{
            width: inner,
            height: inner,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: docW,
              height: docH,
              left: docX - pad,
              top: docY - pad,
              borderRadius: radius,
              background: BRAND.paper,
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.18)",
              display: "flex",
              flexDirection: "column",
              padding: Math.round(docW * 0.14),
              gap: lineGap,
            }}
          >
            <div
              style={{
                width: "72%",
                height: lineH,
                borderRadius: lineH,
                background: BRAND.accent,
                opacity: 0.9,
              }}
            />
            <div
              style={{
                width: "100%",
                height: lineH,
                borderRadius: lineH,
                background: "#cbd5e1",
              }}
            />
            <div
              style={{
                width: "88%",
                height: lineH,
                borderRadius: lineH,
                background: "#cbd5e1",
              }}
            />
            <div
              style={{
                width: "64%",
                height: lineH,
                borderRadius: lineH,
                background: "#cbd5e1",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: pad + Math.round(inner * 0.14),
              bottom: pad + Math.round(inner * 0.12),
              width: penSize,
              height: penSize,
              borderRadius: "50%",
              background: BRAND.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)",
            }}
          >
            <div
              style={{
                width: Math.round(penSize * 0.42),
                height: Math.round(penSize * 0.42),
                borderRadius: 2,
                background: BRAND.ink,
                transform: "rotate(-35deg)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
