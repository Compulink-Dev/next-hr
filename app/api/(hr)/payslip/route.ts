export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== "admin" && session.user?.role !== "hr")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    const payslips = await db.payslip.findMany({
      where: isAdminOrHr ? {} : { userId: session.user.id },
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
