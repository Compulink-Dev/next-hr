import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdatePaymentReport({ params: { id } }) {
    const data = await getData(`reports/payments/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Payments Report' link='reports/payments' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdatePaymentReport