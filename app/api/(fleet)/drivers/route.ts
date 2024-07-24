export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const driver = await db.driver.create({
            data: {
                name: data.name,
                licenseNumber: data.licenseNumber,
                status: data.status,
            },
        })
        console.log(driver);

        return NextResponse.json(driver)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create driver"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const driver = await db.driver.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(driver)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create driver"
        },
            { status: 500 }
        )
    }
}