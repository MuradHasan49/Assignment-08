import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Force Node runtime to support MongoDB operations
export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return NextResponse.json(session || null);
  } catch (error) {
    console.error("Verify Session API error:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
