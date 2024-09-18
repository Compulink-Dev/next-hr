export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function ProjectReports() {

    const certificate = await getData('projects')

    const data = certificate.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            customer: obj.customer,
            destination: obj.destination,
            startDate: obj.startDate,
            endDate: obj.endDate,
            description: obj.description,
            status: obj.status,
            createdAt: obj.createdAt

        }
    })

    const columns = ['name', 'customer', 'destination', 'startDate', 'endDate', 'description', 'status', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/reports/projects/new'}
                title='Certificate'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='reports/projects' resourceName='projects' />
            </div>
        </div>
    )
}

export default ProjectReports