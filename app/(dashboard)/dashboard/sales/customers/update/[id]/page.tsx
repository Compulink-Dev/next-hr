import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateCustomers({ params: { id } }) {
    const data = await getData(`customers/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Customer' link='sales/customers' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateCustomers