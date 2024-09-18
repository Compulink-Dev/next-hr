import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdatePurchase({ params: { id } }) {
    const data = await getData(`purchases/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Purchase' link='sales/purchases' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdatePurchase