export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function FleetReports() {

    const fleet = await getData('reports/fleet')

    const data = fleet.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            vehicleNo: obj.vehicleNo,
            mileage: obj.mileage,
            receiptNo: obj.receiptNo,
            description: obj.description,
            createdAt: obj.createdAt

        }
    })

    const columns = ['name', 'vehicleNo', 'mileage', 'receiptNo', 'description', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/reports/fleet/new'}
                title='Fleet Reports'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='reports/fleet' resourceName='fleet' />
            </div>
        </div>
    )
}

export default FleetReports