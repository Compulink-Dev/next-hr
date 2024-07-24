export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const vehicle = await db.vehicle.create({
            data: {
                name: data.name,
                numberPlate: data.numberPlate,
                serviceDate: data.serviceDate,
                nextService: data.nextService,
                serviceType: data.serviceType,
                radioLicense: data.radioLicense,
                vehicleLicense: data.vehicleLicense,
                mileage: parseFloat(data.mileage),
                status: data.status,
            },
        })
        console.log(vehicle);

        return NextResponse.json(vehicle)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create vehicle"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const vehicle = await db.vehicle.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(vehicle)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create vehicle"
        },
            { status: 500 }
        )
    }
}