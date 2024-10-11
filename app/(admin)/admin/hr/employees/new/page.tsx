import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'



function NewEmployee() {

    return (
        <div className=''>
            <NewHeader title='New employee' link='hr/employees' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewEmployee