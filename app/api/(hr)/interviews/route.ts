import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const interview = await db.interview.create({
      data: {
        name: data.name,
        post: data.post,
        qualification: data.qualification,
        training: data.training,
        experience: data.experience,
        details: data.details,
        knowledge: data.knowledge,
        attributes: data.attributes,
        packages: data.packages,
        rating: data.rating,
        comment: data.comment,
        userId: data.userId,
      },
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { error: "Failed to create interview" },
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
