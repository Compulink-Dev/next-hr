import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import Form from '../_components/Form'



function NewProjectReports() {

    return (
        <div className=''>
            <NewHeader title='New project' link='reports/projects' />
            <div className="">
                <Form />
            </div>
        </div>
    )
}

export default NewProjectReports