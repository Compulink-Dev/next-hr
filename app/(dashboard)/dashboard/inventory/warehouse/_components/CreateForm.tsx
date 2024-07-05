import { getData } from '@/lib/apiResponse'
import React from 'react'
import Form from './Form'

async function CreateForm() {

    const warehouse = await getData('warehouse')

    return (
        <div>
            <Form warehouse={warehouse} />
        </div>
    )
}

export default CreateForm