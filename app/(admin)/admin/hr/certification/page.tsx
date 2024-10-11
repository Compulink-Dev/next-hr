export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function Certification() {

    const certificate = await getData('certification')

    const data = certificate.map((obj: any) => {
        return {
            id: obj.id,
            user: obj.user?.name || 'No-user',
            name: obj.name,
            startDate: obj.startDate,
            endDate: obj.endDate,
            duration: parseFloat(obj.duration) || 'Pending',
            image: obj.image || 'No-image',
            description: obj.description,
            price: obj.price,
            modality: obj.modality,
            attachment: obj.attachment || 'No-file',
            status: obj.status,
            createdAt: obj.createdAt

        }
    })

    const columns = ['user', 'name', 'startDate', 'endDate', 'duration', 'image', 'description', 'price', 'modality', 'attachment', 'status', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/hr/certification/new'}
                title='Certificate'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/certification' resourceName='certification' />
            </div>
        </div>
    )
}

export default Certification