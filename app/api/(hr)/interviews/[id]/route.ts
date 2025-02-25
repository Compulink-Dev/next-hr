import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Fetch a single interview by ID
//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
  try {
    const interview = await db.interview.findUnique({
      where: { id },
    });
    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(interview);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching interview" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing interview
//@ts-ignore
export async function PUT(req: Request, { params: { id } }) {
  try {
    const data = await req.json();
    const updatedInterview = await db.interview.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedInterview);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating interview" },
      { status: 500 }
    );
  }
}

// DELETE: Remove an interview by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.interview.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Interview deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting interview" },
      { status: 500 }
    );
  }
}
