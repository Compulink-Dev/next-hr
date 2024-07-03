import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Units() {

    const units = await getData('units')

    const data = units.map((obj: any) => {
        return {
            name: obj.name,
            abbreviation: obj.abbreviation,
        }
    })

    const columns = ['name', 'abbreviation']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/units/new'}
                title='units'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Units