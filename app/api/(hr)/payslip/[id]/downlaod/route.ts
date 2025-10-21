import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payslip = await db.payslip.findUnique({
      where: { id: params.id }
    });

    if (!payslip) {
      return NextResponse.json({ message: "Payslip not found" }, { status: 404 });
    }

    // Check if the payslip belongs to the user
    if (payslip.userId !== session.user.id && 
        session.user.role !== "ADMIN" && 
        session.user.role !== "HR") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Assuming attachment is a URL to the file
    // You might need to adjust this based on how you store files
    return NextResponse.json({ downloadUrl: payslip.attachment });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error, message: "Failed to process download" },
      { status: 500 }
    );
  }
}