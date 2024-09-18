import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'


function NewInvoice() {

    return (
        <div className=''>
            <NewHeader title='New Tracking' link='fleet/tracking' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewInvoice