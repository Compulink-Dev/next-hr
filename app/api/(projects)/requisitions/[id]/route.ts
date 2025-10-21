import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const rec = await db.requisition.findUnique({ where: { id } });
    if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    if (!isAdminOrHr && rec.requestedBy !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(rec);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const existing = await db.requisition.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    // requester can edit only if still pending; admin/hr can edit anytime
    if (!isAdminOrHr && (existing.requestedBy !== session.user.id || existing.status !== 'pending')) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await request.json();
    const { name, purpose, amount, attachment } = body || {};
    const updated = await db.requisition.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(purpose !== undefined ? { purpose } : {}),
        ...(amount !== undefined ? { amount: parseFloat(amount) } : {}),
        ...(attachment !== undefined ? { attachment } : {}),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const existing = await db.requisition.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const isAdmin = session.user?.role === "admin";
    if (!isAdmin && existing.requestedBy !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    await db.requisition.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}