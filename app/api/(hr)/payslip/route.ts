export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const { name, period, attachment, userId } = await request.json();

    // Ensure all required fields are present
    if (!name || !period || !attachment || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Request body:", request.body);

    const payslip = await db.payslip.create({
      data: { name, period, attachment, userId },
    });

    return NextResponse.json(payslip);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create payslip",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const payslips = await db.payslip.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    console.log("Payslips fetched: ", payslips); // Add logging

    return NextResponse.json(payslips);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch payslips",
      },
      { status: 500 }
    );
  }
}
