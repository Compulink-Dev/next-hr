export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

// Create a tracking point and list recent tracking points
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { vehicleId, latitude, longitude } = data || {};

    if (!vehicleId || typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json({ message: "vehicleId, latitude and longitude are required" }, { status: 400 });
    }

    const tracking = await db.tracking.create({
      data: {
        vehicleId,
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });

    return NextResponse.json(tracking);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create tracking",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const tracking = await db.tracking.findMany({
      orderBy: {
        timestamp: "desc",
      },
      take: 100,
    });

    return NextResponse.json(tracking);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch tracking",
      },
      { status: 500 }
    );
  }
}
