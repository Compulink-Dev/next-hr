import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'



function NewPurchaseReport() {

    return (
        <div className=''>
            <NewHeader title='New purchase' link='reports/purchase' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewPurchaseReport