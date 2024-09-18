import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateHumanResourceReports({ params: { id } }) {
    const data = await getData(`reports/hr/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update report' link='reports/hr' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateHumanResourceReports