"use client";

import { useEffect, useState } from "react";
import { APP_NAME, BACKGROUND_COLOR, LOGO_PATH } from "@/lib/pwa-config";

/**
 * Brief branded splash while the app hydrates (installed PWA / first load).
 * Native install splash uses manifest colors + /splash; this covers in-tab opens.
 */
export default function PwaSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    if (document.readyState === "complete") {
      const t = window.setTimeout(hide, 400);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", hide);
    const fallback = window.setTimeout(hide, 2000);
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
        transition: "opacity 0.35s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
    >
      <img
        src={LOGO_PATH}
        alt=""
        width={120}
        height={120}
        style={{ objectFit: "contain" }}
      />
      <p
        style={{
          marginTop: 20,
          fontSize: 20,
          fontWeight: 600,
          color: "#28286E",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {APP_NAME}
      </p>
    </div>
  );
}
