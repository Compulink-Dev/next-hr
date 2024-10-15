export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function PurchaseReports() {

    const purchase = await getData('reports/purchase')

    const data = purchase.map((obj: any) => {
        return {
            id: obj.id,
            user: obj.user?.name || 'No-user',
            name: obj.name,
            date: obj.date,
            creditName: obj.creditName,
            quantity: parseInt(obj.quantity) || 'Pending',
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
                link={'admin/reports/purchase/new'}
                title='Purchase'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='reports/purchase' resourceName='reports/purchase' />
            </div>
        </div>
    )
}

export default PurchaseReports