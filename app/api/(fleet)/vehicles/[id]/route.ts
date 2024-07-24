import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const vehicle = await db.vehicle.findUnique({
            where: {
                id
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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const vehicle = await db.vehicle.update({
            where: {
                id
            },
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
            message: "Failed to update vehicle"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.vehicle.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
