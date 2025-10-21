export const dynamic = "force-dynamic";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const vehicle = await db.vehicle.create({
      data: {
        name: data.name,
        numberPlate: data.numberPlate,
        serviceDate: data.serviceDate,
        nextService: data.nextService,
        serviceType: data.serviceType,
        radioLicense: data.radioLicense,
        assignedUser: data.assignedUser,
        vehicleLicense: data.vehicleLicense,
        mileage: parseFloat(data.mileage),
        status: data.status,
      },
    });
    console.log(vehicle);

    return NextResponse.json(vehicle);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create vehicle",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const vehicles = await db.vehicle.findMany({
      select: {
        id: true,
        name: true,
        numberPlate: true,
        // include other fields you need
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("Vehicles API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
