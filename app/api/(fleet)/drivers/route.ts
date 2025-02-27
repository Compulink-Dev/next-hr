export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, licenseNumber, status, userId } = body;

    if (!name || !status || !userId) {
      return NextResponse.json(
        { error: "Missing required fields (name, status, userId)" },
        { status: 400 }
      );
    }

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid userId format. Must be a valid ObjectId." },
        { status: 400 }
      );
    }

    const newDriver = await db.driver.create({
      data: {
        name,
        licenseNumber: licenseNumber || null, // Optional field
        status,
        userId, // This will link the driver to a user
      },
    });

    return NextResponse.json(newDriver, { status: 201 });
  } catch (error) {
    console.error("Error creating driver:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const drivers = await db.driver.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(drivers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch drivers" },
      { status: 500 }
    );
  }
}
