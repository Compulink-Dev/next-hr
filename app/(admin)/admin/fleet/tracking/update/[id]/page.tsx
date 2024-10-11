import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import UpdateForm from '../../_components/UpdateForm'

//@ts-ignore
async function UpdateFleet({ params: { id } }) {
    const data = await getData(`fleetInvoice/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Tracking' link='fleet/tracking' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateFleet