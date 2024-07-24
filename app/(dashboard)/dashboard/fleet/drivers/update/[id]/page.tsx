import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import UpdateForm from '../../_components/UpdateForm'

//@ts-ignore
async function UpdateDriver({ params: { id } }) {
    const data = await getData(`drivers/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Driver' link='fleet/drivers' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateDriver