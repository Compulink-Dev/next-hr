import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'


function NewInvoice() {

    return (
        <div className=''>
            <NewHeader title='New Invoice' link='fleet/invoices' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewInvoice