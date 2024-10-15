import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateBrands({ params: { id } }) {
    const data = await getData(`documents/${id}`)
    return (
        <div className=''>
            <NewHeader title='New Document' link='documents' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateBrands