export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Loans() {

    const loan = await getData('loan')

    const data = loan.map((obj: any) => {
        return {
            id: obj.id,
            payment: obj.payment,
            type: obj.type,
            amount: parseFloat(obj.amount),
            repayment: obj.repayment,
            repayments: parseInt(obj.repayments) || 0,
            reason: obj.reason,
            interest: parseFloat(obj.interest) || 0,
            installment: parseFloat(obj.installment) || 0,
            attachment: obj.attachment || "No file",
            createdAt: obj.createdAt
        }
    })

    const columns = ['payment', 'type', 'amount', 'repayment', 'repayments', 'reason', 'interest', 'installment', 'attachment', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/hr/loans/new'}
                title='Loan'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/loans' resourceName='loan' />
            </div>
        </div>
    )
}

export default Loans