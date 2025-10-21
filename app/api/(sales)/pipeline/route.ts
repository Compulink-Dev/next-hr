import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'hr')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await request.json();
    const { name, order } = body || {};
    if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    const rec = await db.pipelineStage.create({ data: { name, order: order ?? 0 } });
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create stage' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await db.pipelineStage.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch stages' }, { status: 500 });
  }
}