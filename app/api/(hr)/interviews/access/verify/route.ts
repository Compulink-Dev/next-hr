// app/api/interview/access/verify/route.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  try {
    // Find unused, unexpired code
    const access = await db.interviewAccess.findFirst({
      where: { 
        code,
        used: false,
        expiresAt: { gt: new Date() }
      }
    });

    if (!access) {
      return NextResponse.json(
        { error: "Invalid or expired access code" },
        { status: 400 }
      );
    }

    // Mark code as used
    await db.interviewAccess.update({
      where: { id: access.id },
      data: { used: true }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying access code:", error);
    return NextResponse.json(
      { error: "Failed to verify access code" },
      { status: 500 }
    );
  }
}