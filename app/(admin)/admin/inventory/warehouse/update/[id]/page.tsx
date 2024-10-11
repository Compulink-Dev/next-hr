import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import UpdateInput from '../../_components/UpdateInput'

//@ts-ignore
async function UpdateWarehouse({ params: { id } }) {
    const data = await getData(`warehouse/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Warehouse' link='inventory/warehouse' />
            <div className="">
                <UpdateInput initialData={data} />
            </div>
        </div>
    )
}

export default UpdateWarehouse