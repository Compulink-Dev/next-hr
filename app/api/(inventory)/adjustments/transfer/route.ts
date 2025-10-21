export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
    try {
        const {
            transferStockQty,
            itemId,
            givingWarehouseId,
            receivingWarehouseId,
            referenceNumber,
            notes } = await request.json()




        const receivingWarehouse = await db.warehouse.findUnique({
            where: {
                id: receivingWarehouseId
            }
        })

        const givingWarehouse = await db.warehouse.findUnique({
            where: {
                id: givingWarehouseId
            }
        })



        const currentGivingWarehouseStock = givingWarehouse.stockQty

        if (parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)) {

            const currentReceivingWarehouseStock = receivingWarehouse.stockQty


            const newStockReceivingWarehouse = parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty)


            const newStockGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty)

            const updatedReceivingWarehouse = await db.warehouse.update({
                where: {
                    id: receivingWarehouseId
                },
                data: {
                    stockQty: newStockReceivingWarehouse
                }
            })


            const updatedGivingWarehouse = await db.warehouse.update({
                where: {
                    id: givingWarehouseId
                },
                data: {
                    stockQty: newStockGivingWarehouse
                }
            })




            const adjustment = await db.transferStockAdjustment.create({
                data: {
                    transferStockQty: Number(transferStockQty),
                    itemId,
                    givingWarehouseId,
                    receivingWarehouseId,
                    referenceNumber,
                    notes
                }
            })
            console.log(adjustment);

            // Auto-create a PurchaseReport entry (used here as stock movement log)
            try {
                const session = await getServerSession(authOptions);
                const userId = (session as any)?.user?.id as string | undefined;
                const item = await db.item.findUnique({ where: { id: itemId } });
                const description = `Transfer ${transferStockQty} of ${item?.name ?? 'item'} from ${givingWarehouse?.name ?? 'A'} to ${receivingWarehouse?.name ?? 'B'} (ref ${referenceNumber})`;
                if (userId) {
                    await db.purchaseReport.create({
                        data: {
                            name: 'Stock Transfer',
                            date: new Date().toISOString(),
                            quantity: Number(transferStockQty),
                            price: 0,
                            description,
                            technician: (session as any)?.user?.name ?? 'system',
                            paymentType: 'N/A',
                            userId,
                        }
                    });
                }
            } catch (e) {
                console.error('Failed to create PurchaseReport for stock transfer:', e);
            }

            return NextResponse.json(adjustment)
        } else {

        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error,
            message: "Failed to create adjustment"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
        const adjustment = await db.transferStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(adjustment)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create adjustment"
        },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await db.transferStockAdjustment.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Delete success' })
    } catch (error) {
        return NextResponse.json(error)
    }
}
