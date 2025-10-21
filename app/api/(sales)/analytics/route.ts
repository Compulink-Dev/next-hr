import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { name, metric, value, entityType, entityId, context } = body || {};
    if (!name || !metric || value == null || !entityType || !entityId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    const rec = await db.analyticsEvent.create({ data: { name, metric, value: parseFloat(value), entityType, entityId, context } });
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'hr')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const list = await db.analyticsEvent.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}