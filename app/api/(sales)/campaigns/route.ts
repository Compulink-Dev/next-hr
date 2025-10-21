import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const { name, type, channel, status, startDate, endDate, budget } = body || {};
    if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    const rec = await db.campaign.create({ data: { name, type, channel, status: status ?? 'active', startDate, endDate, budget: budget ? parseFloat(budget) : null, ownerId: session.user.id } });
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const isAdminOrHr = session.user?.role === 'admin' || session.user?.role === 'hr';
    const list = await db.campaign.findMany({ where: isAdminOrHr ? {} : { ownerId: session.user.id }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}