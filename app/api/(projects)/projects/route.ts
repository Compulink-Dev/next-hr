import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, purpose, amount, attachment, projectId } = body;

    if (!name || !purpose || amount == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reqn = await db.requisition.create({
      data: {
        name,
        purpose,
        amount: parseFloat(amount),
        attachment: attachment ?? null,
        projectId: projectId ?? null,
        requestedBy: session.user.id,
      },
    });

    return NextResponse.json(reqn, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create requisition" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const isAdminOrHr =
      session.user?.role === "admin" || session.user?.role === "hr";

    const list = await db.requisition.findMany({
      where: isAdminOrHr ? {} : { requestedBy: session.user.id },
      include: {
        requester: {
          select: { name: true, email: true },
        },
        approver: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch requisitions" },
      { status: 500 }
    );
  }
}
