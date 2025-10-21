// app/api/(hr)/employees/route.ts
export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const data = await request.json();

    // Create a new employee in the database
    const employee = await db.employee.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        title: data.title,
        appliedDate: data.appliedDate,
        status: data.status,
        user: {
          connectOrCreate: {
            where: { email: data.email },
            create: {
              name: data.name,
              email: data.email,
              role: "employee",
              hashedPassword: await bcrypt.hash("defaultPassword123", 10), // Use hashedPassword instead of password
            },
          },
        },
      },
    });

    // Return created employee as response
    return NextResponse.json(employee);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to create employee",
      },
      { status: 500 }
    );
  }
}

// GET - Fetch all employees
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== "admin" && session.user?.role !== "hr")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const employees = await db.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
        message: "Failed to fetch employees",
      },
      { status: 500 }
    );
  }
}