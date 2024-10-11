import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'


function NewVehicle() {

    return (
        <div className=''>
            <NewHeader title='New Vehicle' link='fleet/vehicles' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewVehicle