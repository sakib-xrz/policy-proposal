import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "পেনশন পলিসি প্রস্তাব",
    short_name: "পেনশন প্রস্তাব",
    description:
      "বাংলায় পেনশন পলিসি প্রস্তাব তৈরি, সম্পাদনা ও PDF ডাউনলোড করুন",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f5f5",
    theme_color: "#2563eb",
    lang: "bn",
    categories: ["finance", "productivity", "business"],
    icons: [
      {
        src: "/icons/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
