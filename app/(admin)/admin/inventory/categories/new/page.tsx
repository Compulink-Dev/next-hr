
import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'


function NewCategory() {
    return (
        <div className=''>
            <NewHeader title='New Category' link='inventory' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewCategory