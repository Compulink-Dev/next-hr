export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Warehouse() {

    const warehouse = await getData('warehouse')

    const data = warehouse.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            location: obj.location,
            description: obj.description,
            warehouseType: obj.warehouseType,
            stockQty: parseInt(obj.stockQty),
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'location', 'description', 'stockQty', 'warehouseType', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/warehouse/new'}
                title='warehouse'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink={'inventory/warehouse'} resourceName='warehouse' />
            </div>
        </div>
    )
}

export default Warehouse