import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const rec = await db.purchaseOrder.findUnique({ where: { id } });
    if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });
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
    const body = await request.json();
    const { name, description, quantity, unit, price, discount, vat, total } = body || {};
    const updated = await db.purchaseOrder.update({
      where: { id },
      data: {
        name,
        description,
        quantity: quantity != null ? String(quantity) : undefined,
        unit,
        price: price != null ? parseFloat(price) : undefined,
        discount: discount != null ? parseFloat(discount) : undefined,
        vat: vat != null ? parseFloat(vat) : undefined,
        total: total != null ? parseFloat(total) : undefined,
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
    await db.purchaseOrder.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}