import { createSplashImage } from "@/lib/splash-image";

export const runtime = "nodejs";

/** Universal PWA / iOS startup splash (portrait phone). */
export async function GET() {
  return createSplashImage(1170, 2532);
}
