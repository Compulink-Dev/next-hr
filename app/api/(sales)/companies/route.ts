// app/api/companies/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await request.json();
    const { name, website, email, phone, address, description } = body || {};
    
    if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

    const rec = await db.company.create({
      data: {
        name,
        website: website ?? null,
        email: email ?? null,
        phone: phone ?? null,
        address: address ?? null,
        description: description ?? null,
        ownerId: session.user.id,
      },
    });
    
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create company" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    
    const list = await db.company.findMany({
      where: isAdminOrHr ? {} : { ownerId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
  }
}