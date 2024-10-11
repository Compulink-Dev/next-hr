export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import CategoryTable from './_components/Table'
import { getData } from '@/lib/apiResponse'
import DataTable from '../adjustments/_components/DataTable'

async function Categories() {

    const categories = await getData('categories')

    const data = categories.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            description: obj.description,
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'description', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/categories/new'}
                title='Categories'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='inventory/categories' resourceName='categories' />
            </div>
        </div>
    )
}

export default Categories