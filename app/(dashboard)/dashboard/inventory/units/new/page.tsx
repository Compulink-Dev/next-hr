import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'

function NewUnit() {
    return (
        <div className=''>
            <NewHeader title='New Unit' link='inventory' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewUnit