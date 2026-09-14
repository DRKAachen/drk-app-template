import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Health-Check für Docker/Coolify: antwortet 200, wenn App und Datenbank erreichbar sind.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "db-fehler" }, { status: 503 });
  }
}
