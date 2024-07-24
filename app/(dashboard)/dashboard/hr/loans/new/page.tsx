import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'



function NewLoan() {

    return (
        <div className=''>
            <NewHeader title='New Loan' link='hr/loans' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewLoan