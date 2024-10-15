import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'
import { getData } from '@/lib/apiResponse'

async function NewBrand() {

    const categories = await getData('documents')


    return (
        <div className=''>
            <NewHeader title='New Document' link='inventory' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewBrand