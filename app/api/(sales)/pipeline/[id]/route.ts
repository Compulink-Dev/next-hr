import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const rec = await db.pipelineStage.findUnique({ where: { id } });
    if (!rec) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(rec);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch stage' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'hr')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await request.json();
    const { name, order } = body || {};
    const updated = await db.pipelineStage.update({ where: { id }, data: { name, order } });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update stage' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'hr')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    await db.pipelineStage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete stage' }, { status: 500 });
  }
}
