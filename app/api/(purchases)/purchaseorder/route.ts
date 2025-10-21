import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const { name, description, quantity, unit, price, discount, vat, total } = body || {};
    if (!name || !description || !quantity || !unit || price == null || discount == null || vat == null || total == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const rec = await db.purchaseOrder.create({
      data: {
        name,
        description,
        quantity: String(quantity),
        unit,
        price: parseFloat(price),
        discount: parseFloat(discount),
        vat: parseFloat(vat),
        total: parseFloat(total),
      },
    });
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create purchase order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const list = await db.purchaseOrder.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch purchase orders" }, { status: 500 });
  }
}