import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'

function NewAdjustment() {
    return (
        <div className=''>
            <NewHeader title='New Adjustment' link='inventory' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewAdjustment