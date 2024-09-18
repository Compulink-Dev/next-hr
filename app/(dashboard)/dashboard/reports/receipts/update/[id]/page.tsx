import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateReceiptsReports({ params: { id } }) {
    const data = await getData(`certification/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Certificate' link='hr/certification' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateReceiptsReports