export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function HumanResourceReport() {

    const hr = await getData('reports/hr')

    const data = hr.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            loan: obj.loan,
            leave: obj.leave,
            advance: obj.advance,
            date: obj.date,
            createdAt: obj.createdAt

        }
    })

    const columns = ['name', 'loan', 'leave', 'advance', 'date', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/reports/hr/new'}
                title='Human Resource'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='reports/hr' resourceName='hr' />
            </div>
        </div>
    )
}

export default HumanResourceReport