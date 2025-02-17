import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateHrLoan({ params: { id } }) {
    const data = await getData(`loan/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Loan' link='hr/loans' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateHrLoan