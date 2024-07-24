export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Driver() {

    const drive = await getData('drivers')

    const data = drive.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            licenseNumber: obj.licenseNumber,
            status: obj.status,
        }
    })

    const columns = ['name', 'licenseNumber', 'status', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/fleet/drivers/new'}
                title='Driver'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='fleet/drivers' resourceName='drivers' />
            </div>
        </div>
    )
}

export default Driver