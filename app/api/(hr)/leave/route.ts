export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    const userId = isAdminOrHr ? data.userId ?? session.user.id : session.user.id;
    const leave = await db.leave.create({
      data: {
        name: data.name,
        type: data.type,
        source: data.source,
        from: new Date(data.from), // Convert string to Date
        to: new Date(data.to), // Convert string to Date
        duration: data.duration,
        contact: data.contact,
        reason: data.reason,
        attachment: data.attachment || null,
        status: data.status || "pending",
        user: {
          connect: { id: userId },
        },
      },
    });

    console.log(leave);

    return NextResponse.json(leave);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create leave",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    
    const list = await db.leave.findMany({
      where: isAdminOrHr ? {} : { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch leave records" }, { status: 500 });
  }
}