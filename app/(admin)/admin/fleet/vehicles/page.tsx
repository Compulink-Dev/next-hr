export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function Vehicle() {

    const vehicle = await getData('vehicles')

    const data = vehicle.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            numberPlate: obj.numberPlate,
            serviceDate: obj.serviceDate,
            nextService: obj.nextService,
            radioLicense: obj.radioLicense,
            vehicleLicense: obj.vehicleLicense,
            mileage: parseInt(obj.mileage),
            status: obj.status || 'No-available',
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'numberPlate', 'serviceDate', 'nextService', 'radioLicense', 'vehicleLicense', 'mileage', 'status', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/fleet/vehicles/new'}
                title='Vehicle'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='fleet/vehicles' resourceName='vehicles' />
            </div>
        </div>
    )
}

export default Vehicle