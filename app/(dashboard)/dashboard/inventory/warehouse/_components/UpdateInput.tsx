import React from 'react'
import CreateForm from './CreateForm'
import { getData } from '@/lib/apiResponse'
import UpdateForm from './UpdateForm'

async function UpdateInput({ initialData }: any) {

    const warehouse = await getData('warehouse')

    return (
        <div>
            <UpdateForm initialData={initialData} warehouse={warehouse} />
        </div>
    )
}

export default UpdateInput