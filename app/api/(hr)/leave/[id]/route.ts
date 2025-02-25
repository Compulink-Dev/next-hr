import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
  try {
    const leave = await db.leave.findUnique({
      where: {
        id,
      },
    });

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
export async function PUT(request: Request, { params: { id } }) {
  try {
    const data = await request.json();

    const leave = await db.leave.update({
      where: { id },
      data: {
        type: data.type,
        source: data.source,
        from: new Date(data.from), // Convert to Date object
        to: new Date(data.to), // Convert to Date object
        duration: data.duration,
        contact: data.contact,
        reason: data.reason,
        status: data.status,
        attachment: data.attachment,
      },
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
