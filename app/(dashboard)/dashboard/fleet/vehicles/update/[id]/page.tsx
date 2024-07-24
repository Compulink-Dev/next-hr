import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import UpdateForm from '../../_components/UpdateForm'

//@ts-ignore
async function UpdateVehicle({ params: { id } }) {
    const data = await getData(`vehicles/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Vehicle' link='fleet/vehicles' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateVehicle