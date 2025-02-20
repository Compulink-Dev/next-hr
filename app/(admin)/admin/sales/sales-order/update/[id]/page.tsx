import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateSalesOrder({ params: { id } }) {
    const data = await getData(`sales-order/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Order' link='sales/salesorder' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateSalesOrder