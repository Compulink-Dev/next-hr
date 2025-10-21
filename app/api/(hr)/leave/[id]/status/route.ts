import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== "admin" && session.user?.role !== "hr")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { status } = await request.json();

    const leave = await db.leave.update({
      where: { id },
      data: { status },
    });

    // Auto-create HR report entry for auditing
    try {
      await db.hrReport.create({
        data: {
          name: `Leave ${status}`,
          date: new Date().toISOString(),
          leaveId: leave.id,
          userId: session.user.id,
        }
      });
    } catch (e) {
      console.error('Failed to create HrReport for leave status:', e);
    }

    return NextResponse.json(leave);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error, message: "Failed to update leave status" },
      { status: 500 }
    );
  }
}
