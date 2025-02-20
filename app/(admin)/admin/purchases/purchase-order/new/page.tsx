import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'

function NewCustomer() {

    return (
        <div className=''>
            <NewHeader title='New Purchase Order' link='purchases/purchaseorder' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewCustomer