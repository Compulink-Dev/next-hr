import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '../../_components/DataTable'


async function Sales() {

    const sales = await getData('sales-order')

    const data = sales.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            quantity: obj.quantity,
            unit: obj.unit,
            price: obj.price,
            vat: obj.vat,
            discount: obj.discount,
            total: obj.total,
            description: obj.description,
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'quantity', 'unit', 'price', 'discount', 'vat', 'total', 'description', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/sales/salesorder/new'}
                title='Order'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='sales/salesorder' resourceName='sales-order' />
            </div>
        </div>
    )
}

export default Sales