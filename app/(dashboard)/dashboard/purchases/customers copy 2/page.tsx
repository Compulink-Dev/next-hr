import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Customer() {

    const customers = await getData('customers')

    const data = customers.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            phone: obj.phone,
            email: obj.email,
            address: obj.address,
            company: obj.company,
            notes: obj.notes,
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'phone', 'email', 'address', 'company', 'notes', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/sales/customers/new'}
                title='Customers'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='sales/customers' resourceName='customers' />
            </div>
        </div>
    )
}

export default Customer