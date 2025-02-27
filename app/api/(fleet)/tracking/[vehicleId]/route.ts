// app/api/vehicle/[vehicleId]/tracking/route.ts

import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { vehicleId: string } }
) {
  const { vehicleId } = params;

  if (!vehicleId) {
    return NextResponse.json(
      { error: "Vehicle ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch tracking data for the given vehicle ID
    const trackingData = await db.tracking.findMany({
      where: {
        vehicleId: Number(vehicleId),
      },
      orderBy: {
        timestamp: "desc", // Order by most recent first
      },
    });

    return NextResponse.json(trackingData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tracking data" },
      { status: 500 }
    );
  }
}
