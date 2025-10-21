import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { panelists } = await req.json();
    
    const updatedInterview = await db.interview.update({
      where: { id: params.id },
      data: {
        assignedPanelists: panelists,
      },
    });

    return NextResponse.json(updatedInterview);
  } catch (error) {
    console.error("Error assigning panelists:", error);
    return NextResponse.json(
      { error: "Failed to assign panelists" },
      { status: 500 }
    );
  }
}