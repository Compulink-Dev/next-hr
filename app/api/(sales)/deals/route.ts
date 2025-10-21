import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const { name, amount, status, probability, closeDate, stageId, companyId, leadId } = body || {};
    if (!name || amount == null) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const rec = await db.deal.create({
      data: {
        name,
        amount: parseFloat(amount),
        status: status ?? 'open',
        probability: probability ?? null,
        closeDate: closeDate ?? null,
        stageId: stageId ?? null,
        companyId: companyId ?? null,
        leadId: leadId ?? null,
        ownerId: session.user.id,
      },
    });
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create deal" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    const list = await db.deal.findMany({
      where: isAdminOrHr ? {} : { ownerId: session.user.id },
      include: {
        stage: { select: { name: true } },
        company: { select: { name: true } },
        lead: { select: { name: true } },
        owner: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}