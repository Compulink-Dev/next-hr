import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'
import UpdateLoanStatus from '../../_components/LoanUpdate'

//@ts-ignore
async function UpdateLoan({ params: { id } }) {
    const data = await getData(`loan/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Loan Status' link='hr/loans' />
            <div className="">
                <UpdateLoanStatus initialData={data} />
            </div>
        </div>
    )
}

export default UpdateLoan