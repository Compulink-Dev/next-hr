export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from './_components/DataTable'
import FixedUserHeader from '@/app/(admin)/_components/fixedHeader'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

async function Leave() {


    const leave = await getData('leave')

    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role;
    const userName = session?.user?.name;

    const data = leave
        .filter((obj: any) => userRole === 'admin' || obj.name === userName) // Only show user's own payslip if not admin
        .map((obj: any) => ({
            id: obj.id,
            name: obj.name,
            type: obj.type,
            source: obj.source,
            from: obj.from,
            to: obj.to,
            duration: obj.duration,
            contact: obj.contact,
            reason: obj.reason,
            status: obj.status || 'Pending',
            attachment: obj.attachment || 'No-file',
            createdAt: obj.createdAt
        }))

    const countLoansByStatus = (status: string) =>
        data?.filter((loan: any) => loan.status === status).length

    const columns = ['name', 'type', 'source', 'from', 'to', 'duration', 'contact', 'reason', 'status', 'attachment', 'createdAt']

    return (
        <div>
            <FixedUserHeader
                link={'admin/hr/leave/new'}
                title='Leave'
            />

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4">
                <div className="p-4 bg-green-100 rounded shadow-md text-center">
                    <h2 className="text-lg font-bold">Approved</h2>
                    <p className="text-2xl">{countLoansByStatus('Approved')}</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded shadow-md text-center">
                    <h2 className="text-lg font-bold">Pending</h2>
                    <p className="text-2xl">{countLoansByStatus('Pending')}</p>
                </div>
                <div className="p-4 bg-red-100 rounded shadow-md text-center">
                    <h2 className="text-lg font-bold">Rejected</h2>
                    <p className="text-2xl">{countLoansByStatus('Rejected')}</p>
                </div>
            </div>

            {/* Data Table */}
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/leave' resourceName='leave' />
            </div>
        </div>
    )
}

export default Leave