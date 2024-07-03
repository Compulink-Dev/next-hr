import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Brands() {

    const brands = await getData('brands')

    const data = brands.map((obj: any) => {
        return {
            name: obj.name,
        }
    })

    const columns = ['name']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/brands/new'}
                title='Brands'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Brands