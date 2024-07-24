import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const driver = await db.driver.findUnique({
            where: {
                id
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

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const driver = await db.driver.update({
            where: {
                id
            },
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
            message: "Failed to update driver"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.driver.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
