import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { title, description, dueDate, status, entityType, entityId } = body || {};
    if (!title || !entityType || !entityId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    const rec = await db.task.create({ data: { title, description, dueDate, status: status ?? 'open', entityType, entityId, ownerId: session.user.id } });
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const isAdminOrHr = session.user?.role === 'admin' || session.user?.role === 'hr';
    const list = await db.task.findMany({ where: isAdminOrHr ? {} : { ownerId: session.user.id }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}