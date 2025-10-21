// app/api/interview/access/route.ts (GET handler)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "hr") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const codes = await db.interviewAccess.findMany({
      where: { createdById: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        createdBy: {
          select: {
            name: true
          }
        },
        assignedTo: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(codes);
  } catch (error) {
    console.error("Error fetching access codes:", error);
    return NextResponse.json(
      { error: "Failed to fetch access codes" },
      { status: 500 }
    );
  }
}