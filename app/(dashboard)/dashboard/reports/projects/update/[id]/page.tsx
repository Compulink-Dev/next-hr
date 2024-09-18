import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import UpdateForm from '../../_components/UpdateForm'
import { getData } from '@/lib/apiResponse'

//@ts-ignore
async function UpdateProjectReports({ params: { id } }) {
    const data = await getData(`reports/projects/${id}`)
    return (
        <div className=''>
            <NewHeader title='Update Project' link='reports/projects' />
            <div className="">
                <UpdateForm initialData={data} />
            </div>
        </div>
    )
}

export default UpdateProjectReports