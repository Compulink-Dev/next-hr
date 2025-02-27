import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const fleetInvoice = await db.fleetInvoice.create({
      data: {
        name: session.user.name,
        location: data.location,
        time: data.time,
        paymentType: data.paymentType,
        amount: parseFloat(data.amount),
        userId: session.user.id, // Assign userId from session
      },
    });

    return NextResponse.json(fleetInvoice);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error, message: "Failed to create fleetInvoice" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const fleetInvoice = await db.fleetInvoice.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(fleetInvoice);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create fleetInvoice",
      },
      { status: 500 }
    );
  }
}
