import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    console.log("Session Data:", session);
    return NextResponse.json({ session });
}
