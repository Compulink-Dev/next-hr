import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const rec = await db.campaign.findUnique({ where: { id } });
    if (!rec) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const isAdminOrHr = session.user?.role === 'admin' || session.user?.role === 'hr';
    if (!isAdminOrHr && rec.ownerId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    return NextResponse.json(rec);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const existing = await db.campaign.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const isAdminOrHr = session.user?.role === 'admin' || session.user?.role === 'hr';
    if (!isAdminOrHr && existing.ownerId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const body = await request.json();
    const { name, type, channel, status, startDate, endDate, budget } = body || {};
    const updated = await db.campaign.update({ where: { id }, data: { name, type, channel, status, startDate, endDate, budget } });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const existing = await db.campaign.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const isAdminOrHr = session.user?.role === 'admin' || session.user?.role === 'hr';
    if (!isAdminOrHr && existing.ownerId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    await db.campaign.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
