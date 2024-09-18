import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'



function NewFleetReport() {

    return (
        <div className=''>
            <NewHeader title='New Fleet Report' link='reports/fleet' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewFleetReport