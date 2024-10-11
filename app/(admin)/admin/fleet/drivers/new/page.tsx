import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'


function NewDriver() {

    return (
        <div className=''>
            <NewHeader title='New Driver' link='fleet/driver' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewDriver