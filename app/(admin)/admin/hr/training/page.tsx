export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '@/app/(admin)/_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Training() {

    const training = await getData('training')

    const data = training.map((obj: any) => {
        return {
            name: obj.name,
            startDate: obj.startDate,
            endDate: obj.endDate,
            duration: parseFloat(obj.duration) || 'On-going',
            image: obj.image || 'No-image',
            description: obj.description,
            price: parseFloat(obj.price) || 'No-price',
            modality: obj.modality,
            attachment: obj.attachment || 'No-file',
            status: obj.status,
            createdAt: obj.createdAt
        }
    })

    const columns = ['name', 'startDate', 'endDate', 'duration', 'image', 'description', 'price', 'modality', 'attachment', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/hr/training/new'}
                title='Training'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/training' resourceName='training' />
            </div>
        </div>
    )
}

export default Training