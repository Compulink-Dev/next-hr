export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Employee() {

    const employee = await getData('employees')

    const data = employee.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            email: obj.email,
            phone: obj.phone,
            address: obj.address,
            title: obj.title,
            appliedDate: obj.appliedDate,
            status: obj.status,
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'email', 'phone', 'address', 'title', 'appliedDate', 'status', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/hr/employees/new'}
                title='Employee'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/employees' resourceName='employees' />
            </div>
        </div>
    )
}

export default Employee