export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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
          connect: { email: data.email }, // Assuming data.userId is provided
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
