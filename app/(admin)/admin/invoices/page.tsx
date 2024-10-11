export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '../../_components/DataTable'

async function Invoice() {

    const invoice = await getData('fleetInvoice')

    const data = invoice.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            location: obj.location,
            time: obj.time,
            paymentType: obj.paymentType,
            amount: parseFloat(obj.amount) || "$0",
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'location', 'time', 'paymentType', 'amount', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/fleet/invoices/new'}
                title='Invoice'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='fleet/invoices' resourceName='fleetInvoice' />
            </div>
        </div>
    )
}

export default Invoice