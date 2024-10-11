import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateCategory({ params: { id } }) {
    const data = await getData(`employees/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Employee' link='hr/employees' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateCategory