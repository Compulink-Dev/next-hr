import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const userName = session?.user?.name;

        if (!userName) {
            return NextResponse.json({ message: "User is not authenticated" }, { status: 401 });
        }

        console.log("Received vehicle ID:", params.id);
        console.log("Current user name:", userName);

        const vehicle = await db.vehicle.findUnique({
            where: { id: params.id }
        });

        if (!vehicle) {
            return NextResponse.json({ message: "Vehicle not found" }, { status: 404 });
        }

        // Change status based on current status and assigned user
        if (vehicle.status === 'Available') {
            // Switch to 'In Transit'
            return await updateVehicleStatus(params.id, "In Transit", userName, new Date());
        } else if (vehicle.status === 'In Transit') {
            // Switch back to 'Available'
            return await updateVehicleStatus(params.id, "Available", userName, vehicle.transitStart);
        } else {
            return NextResponse.json({ message: "Unauthorized action" }, { status: 400 });
        }

    } catch (error) {
        console.error("Error updating vehicle:", error);
        return NextResponse.json({ message: "Failed to update vehicle", error }, { status: 500 });
    }
}

async function updateVehicleStatus(id: string, status: string, user: string | null, transitStart?: Date) {
    const updateData: any = { status, assignedUser: user };

    if (status === "Available" && transitStart) {
        // Calculate transit duration when returning to "Available"
        updateData.assignedUser = "Admin";
        updateData.transitEnd = new Date();
        updateData.transitDuration = Math.round((Date.now() - transitStart.getTime()) / 1000);
    } else if (status === "In Transit") {
        // Set transit start time when status changes to "In Transit"
        updateData.assignedUser = user;
        updateData.transitStart = transitStart;
    }

    return NextResponse.json(await db.vehicle.update({ where: { id }, data: updateData }));
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
