import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'

function NewSupplier() {
    return (
        <div className=''>
            <NewHeader title='New Supplier' link='inventory' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewSupplier