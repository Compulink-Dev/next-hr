import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const invoice = await db.salesInvoice.create({
            data: {
                name: data.name ?? "Invoice",
            },
        })
        console.log(invoice);

        // Auto-create a SalesReport entry for reporting dashboards
        try {
            const session = await getServerSession(authOptions);
            const userId = (session as any)?.user?.id as string | undefined;
            const amount = data?.amount ? parseFloat(data.amount) : 0;
            const paymentType = data?.paymentType ?? "N/A";
            if (userId) {
                await db.salesReport.create({
                    data: {
                        name: invoice.name ?? "Invoice",
                        amount,
                        paymentType,
                        userId,
                    },
                });
            }
        } catch (e) {
            // Non-fatal: report creation failure shouldn't block invoice creation
            console.error("Failed to create SalesReport for invoice:", e);
        }

        return NextResponse.json(invoice)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create customers"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const invoices = await db.salesInvoice.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(invoices)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create customer"
        },
            { status: 500 }
        )
    }
}