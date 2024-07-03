import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'

function NewItem() {
    return (
        <div className=''>
            <NewHeader title='New Item' link='inventory/items' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewItem