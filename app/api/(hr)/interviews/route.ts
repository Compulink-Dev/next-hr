import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.userId) {
      return NextResponse.json(
        { error: "Name and userId are required" },
        { status: 400 }
      );
    }
  // Helper function to convert empty strings to null
    const emptyToNull = (value: any) => (value === "" ? null : value);

    const interview = await db.interview.create({
      data: {
        name: data.name,
        post: emptyToNull(data.post),
        qualification: emptyToNull(data.qualification),
        training: emptyToNull(data.training),
        experience: emptyToNull(data.experience),
        details: emptyToNull(data.details),
        knowledge: emptyToNull(data.knowledge),
        attributes: emptyToNull(data.attributes),
        packages: emptyToNull(data.packages),
        rating: data.rating ? Number(data.rating) : 0,
        comment: emptyToNull(data.comment),
        assignedPanelists: data.assignedPanelists || [],
        user: {
          connect: {
            id: data.userId
          }
        }
      },
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (error: any) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { 
        error: "Failed to create interview",
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const interviews = await db.interview.findMany();
    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}
