import { createAppIconImage } from "@/lib/app-icon";

export const runtime = "edge";

export async function GET() {
  return createAppIconImage(192);
}
