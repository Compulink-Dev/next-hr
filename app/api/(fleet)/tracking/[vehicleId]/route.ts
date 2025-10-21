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
    const trackingData = await db.tracking.findMany({
      where: {
        vehicleId: vehicleId, // vehicleId is an ObjectId stored as string in Prisma schema
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 100,
    });

    return NextResponse.json(trackingData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tracking data" },
      { status: 500 }
    );
  }
}
