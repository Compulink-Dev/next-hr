// app/api/leads/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await request.json();
    const { name, email, phone, source, status, companyId } = body || {};
    
    if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

    const rec = await db.lead.create({
      data: {
        name,
        email: email ?? null,
        phone: phone ?? null,
        source: source ?? null,
        status: status ?? 'new',
        companyId: companyId ?? null,
        ownerId: session.user.id,
      },
    });
    
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    
    const list = await db.lead.findMany({
      where: isAdminOrHr ? {} : { ownerId: session.user.id },
      include: { 
        company: { select: { name: true } }, 
        owner: { select: { name: true } } 
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}