export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function PaySlip() {

    const slip = await getData('payslip')

    const data = slip.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            period: obj.period,
            attachment: obj.attachment || 'No-file',
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'period', 'attachment', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/hr/pay-slips/new'}
                title='Payslip'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/pay-slip' resourceName='payslip' />
            </div>
        </div>
    )
}

export default PaySlip