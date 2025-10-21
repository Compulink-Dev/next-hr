import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const leave = await db.leave.findUnique({
      where: {
        id,
      },
    });

    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    if (!isAdminOrHr && leave?.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
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

//@ts-ignore
//@ts-ignore
// app/api/leave/[id]/route.ts
export async function PUT(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const current = await db.leave.findUnique({ where: { id } });
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    if (!isAdminOrHr && current?.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const data = await request.json();

    // Only update fields that are provided in the request
    const updateData: any = {
      status: data.status,
    };

    // Only include these fields if they're provided
    if (data.type !== undefined) updateData.type = data.type;
    if (data.source !== undefined) updateData.source = data.source;
    if (data.from !== undefined) updateData.from = new Date(data.from);
    if (data.to !== undefined) updateData.to = new Date(data.to);
    if (data.duration !== undefined) updateData.duration = data.duration;
    if (data.contact !== undefined) updateData.contact = data.contact;
    if (data.reason !== undefined) updateData.reason = data.reason;
    if (data.attachment !== undefined) updateData.attachment = data.attachment;

    const leave = await db.leave.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(leave);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error, message: "Failed to update leave" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const current = await db.leave.findUnique({ where: { id: params.id } });
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    if (!isAdminOrHr && current?.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await db.leave.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Delete success" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
