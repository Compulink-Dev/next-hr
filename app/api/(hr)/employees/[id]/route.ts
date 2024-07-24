import db from "@/lib/db";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(request: Request, { params: { id } }) {
    try {

        const employee = await db.employee.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(employee)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create employee"
        },
            { status: 500 }
        )
    }
}

//@ts-ignore
export async function PUT(request: Request, { params: { id } }) {
    try {
        const data = await request.json()
        const employee = await db.employee.update({
            where: {
                id
            },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                description: data.description,
                address: data.address,
                title: data.title,
                appliedDate: data.appliedDate,
                status: data.status,
            },
        })
        console.log(employee);

        return NextResponse.json(employee)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update employee"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.employee.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
