export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
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
          connect: { id: data.userId }, // Make sure `userId` is passed from the frontend
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

export async function GET(request: Request) {
  try {
    const leave = await db.leave.findMany({
      orderBy: {
        createdAt: "desc",
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
