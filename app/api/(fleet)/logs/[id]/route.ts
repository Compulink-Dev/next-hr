import db from "@/lib/db";
import { NextResponse } from "next/server";

// 📌 GET LOG BY ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const log = await db.log.findUnique({ where: { id: params.id } });
    if (!log)
      return NextResponse.json({ error: "Log not found" }, { status: 404 });

    return NextResponse.json(log);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch log" }, { status: 500 });
  }
}

// 📌 UPDATE LOG BY ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { date, time, mileage, details, remarks } = await req.json();
    const updatedLog = await db.log.update({
      where: { id: params.id },
      data: { date: new Date(date), time, mileage, details, remarks },
    });

    return NextResponse.json(updatedLog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update log" },
      { status: 500 }
    );
  }
}

// 📌 DELETE LOG BY ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.log.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Log deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete log" },
      { status: 500 }
    );
  }
}
