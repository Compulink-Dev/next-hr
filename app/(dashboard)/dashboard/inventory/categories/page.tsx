import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import CategoryTable from './_components/Table'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Categories() {

    const categories = await getData('categories')

    const data = categories.map((obj: any) => {
        return {
            name: obj.name,
            description: obj.description
        }
    })

    const columns = ['name', 'description']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/categories/new'}
                title='Categories'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Categories