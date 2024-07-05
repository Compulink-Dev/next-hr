import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateBrands({ params: { id } }) {
    const data = await getData(`suppliers/${id}`)
    return (
        <div className=''>
            <NewHeader title='New Supplier' link='inventory/suppliers' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateBrands