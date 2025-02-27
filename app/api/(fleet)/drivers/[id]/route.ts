import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
  try {
    const driver = await db.driver.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(driver);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create driver",
      },
      { status: 500 }
    );
  }
}

//@ts-ignore
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { status, userId } = body;
    if (!status || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const vehicleId = params.id;

    const updatedVehicle = await db.vehicle.update({
      where: { id: vehicleId },
      data: {
        status,
        assignedUser: status === "In Transit" ? userId : "admin",
      },
    });

    return NextResponse.json(updatedVehicle, { status: 200 });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.driver.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Delete success" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
