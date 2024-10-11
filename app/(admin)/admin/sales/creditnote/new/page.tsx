import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'

function NewBrand() {

    return (
        <div className=''>
            <NewHeader title='New Credit Note' link='sales' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewBrand