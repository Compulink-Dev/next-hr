export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Employee() {

    const leave = await getData('leave')

    const data = leave.map((obj: any) => {
        return {
            id: obj.id,
            type: obj.type,
            source: obj.source,
            from: obj.from,
            to: obj.to,
            duration: obj.duration,
            contact: obj.contact,
            reason: obj.reason,
            attachment: obj.attachment,
            createdAt: obj.createdAt
        }
    })

    const columns = ['type', 'source', 'from', 'to', 'duration', 'contact', 'reason', 'attachment', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'dashboard/hr/leave/new'}
                title='Leave'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='hr/leave' resourceName='leave' />
            </div>
        </div>
    )
}

export default Employee