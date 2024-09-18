export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function PaymentReports() {

    const payments = await getData('reports/payments')

    const data = payments.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            invoiceNo: obj.invoiceNo,
            product: obj.product,
            date: obj.date,
            description: obj.description,
            createdAt: obj.createdAt

        }
    })

    const columns = ['name', 'invoiceNo', 'product', 'date', 'description', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/reports/payments/new'}
                title='Payments Report'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/payments' resourceName='payments' />
            </div>
        </div>
    )
}

export default PaymentReports