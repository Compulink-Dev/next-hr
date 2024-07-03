import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Warehouse() {

    const warehouse = await getData('warehouse')

    const data = warehouse.map((obj: any) => {
        return {
            name: obj.name,
            location: obj.location,
            description: obj.description,
            warehouseType: obj.warehouseType,
        }
    })

    const columns = ['name', 'location', 'description', 'warehouseType']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/warehouse/new'}
                title='warehouse'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Warehouse