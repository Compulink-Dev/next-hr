export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function SalesReport() {

    const salesReport = await getData('salesReport')

    const data = salesReport.map((obj: any) => {
        return {
            id: obj.id,
            user: obj.user?.name || 'No-user',
            name: obj.name,
            date: obj.date,
            creditName: obj.creditName,
            quantity: parseFloat(obj.quantity) || 'Pending',
            price: parseFloat(obj.price) || 'Pending',
            description: obj.description,
            technician: obj.technician,
            attachment: obj.attachment || 'No-file',
            status: obj.status,
            createdAt: obj.createdAt

        }
    })

    const columns = ['user', 'name', 'date', 'creditName', 'quantity', 'price', 'description', 'technician', 'attachment', 'status', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/reports/sales/new'}
                title='Sales Report'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='reports/sales' resourceName='sales' />
            </div>
        </div>
    )
}

export default SalesReport