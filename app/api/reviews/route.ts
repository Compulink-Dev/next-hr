// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { interviewId, panelistId, rating, comment } = await req.json();

    // Validate input
    if (!interviewId || !panelistId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if review already exists
    const existingReview = await db.review.findFirst({
      where: {
        interviewId,
        panelistId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already submitted a review for this interview" },
        { status: 400 }
      );
    }

    // Authorization: panelist must be the session user unless admin/hr
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    if (!isAdminOrHr && panelistId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Create new review
    const review = await db.review.create({
      data: {
        interviewId,
        panelistId,
        rating: Number(rating),
        comment: comment || null,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== "admin" && session.user?.role !== "hr")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const reviews = await db.review.findMany();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}