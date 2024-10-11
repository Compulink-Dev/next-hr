import React from 'react'
import HrCard from './HrCard'
import DataTable from './Datatable'

function Users() {
    return (
        <div className='p-4'>
            <div className="pb-4">
                <p className="text-lg text-slate-700 font-bold">Human Resource</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <HrCard />
                <HrCard />
                <HrCard />
            </div>
            <div className="mt-8">
                <div className="pb-4">
                    <p className="text-lg text-slate-700 font-bold">Employee Details</p>
                </div>
                <DataTable />
            </div>
        </div>
    )
}

export default Users