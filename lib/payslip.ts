import db from '@/lib/db';

// Fetch all payslips, ordered by createdAt
export async function getAllPayslips() {
    try {
        const payslips = await db.payslip.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return payslips;
    } catch (error) {
        throw new Error('Failed to fetch payslips');
    }
}

// Fetch payslips by userId for the user view
export async function getPayslipsByUserId(userId: string) {
    try {
        const payslips = await db.payslip.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return payslips;
    } catch (error) {
        throw new Error('Failed to fetch user payslips');
    }
}
