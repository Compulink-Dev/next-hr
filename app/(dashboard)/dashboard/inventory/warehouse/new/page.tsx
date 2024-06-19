import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'

function NewWarehouse() {
    return (
        <div className=''>
            <NewHeader title='New Warehouse' link='inventory' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewWarehouse