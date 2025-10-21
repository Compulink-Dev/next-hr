export const dynamic = "force-dynamic";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        const data = await request.json()

        console.log('Loan session :', session);


        const userId = session && session.user && session.user.id;

        const loans = await db.loans.create({
            data: {
                payment: data.payment,
                type: data.type,
                amount: parseFloat(data.amount),
                repayment: data.repayment,
                repayments: parseInt(data.repayments),
                reason: data.reason,
                status: data.status || 'Pending',
                interest: parseFloat(data.interest),
                installment: parseFloat(data.installment),
                attachment: data.attachment,
                user: {
                    connect: {
                        email: session?.user.email,
                    },
                },
            },
        });
        console.log(loans);

        return NextResponse.json(loans)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create loan"
        },
            { status: 500 }
        )

    }
}

export async function GET(request: Request) {
    try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const isAdminOrHr = session.user?.role === "admin" || session.user?.role === "hr";
    const loans = await db.loans.findMany({
      where: isAdminOrHr ? {} : { userId: session.user.id },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
        return NextResponse.json(loans)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to create loans"
        },
            { status: 500 }
        )
    }
}