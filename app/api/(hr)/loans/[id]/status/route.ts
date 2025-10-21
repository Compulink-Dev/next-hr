import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== "admin" && session.user?.role !== "hr")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const data = await request.json();

    const loans = await db.loans.update({
      where: { id },
      data: {
        status: data.status, // ✅ only update status
      },
    });

    // Auto-create HR report entry for auditing
    try {
      await db.hrReport.create({
        data: {
          name: `Loan ${data.status}`,
          date: new Date().toISOString(),
          loanId: loans.id,
          userId: session.user.id,
        }
      });
    } catch (e) {
      console.error('Failed to create HrReport for loan status:', e);
    }

    return NextResponse.json(loans);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error, message: "Failed to update loans" },
      { status: 500 }
    );
  }
}
