import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'
import UpdateInput from '../../_components/UpdateInput'

//@ts-ignore
async function UpdateItem({ params: { id } }) {
    const data = await getData(`items/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Item' link='inventory/items' />
            <div className="">
                <UpdateInput initialData={data} />
            </div>
        </div>
    )
}

export default UpdateItem