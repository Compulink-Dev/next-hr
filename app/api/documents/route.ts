import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, subTitle, attachment, category, visibility = "private", sharedWith = [] } = body || {};

    if (!name || !attachment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const doc = await db.document.create({
      data: {
        name,
        subTitle: subTitle ?? "",
        attachment,
        category: category ?? "General",
        visibility,
        sharedWith,
        userId: session.user.id,
      },
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const isAdmin = session.user?.role === "admin";
    const userId = session.user.id;

    const docs = await db.document.findMany({
      where: isAdmin
        ? {}
        : {
            OR: [
              { userId },
              { visibility: "org" },
              { sharedWith: { has: userId } },
            ],
          },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(docs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}