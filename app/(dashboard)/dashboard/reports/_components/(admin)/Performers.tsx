import { User } from 'lucide-react'
import React from 'react'


const PerformersCard = () => {
    return (
        <div className="shadow rounded p-8 flex flex-col items-center justify-center ">
            <div className="h-16 w-16 rounded-full border flex items-center justify-center">
                <User />
            </div>
            <div className="text-sm mt-2">
                <p className="font-bold text-lg">Name</p>
                <p className="">Position</p>
                <p className="">80%</p>
            </div>
        </div>
    )
}

function Performers() {
    return (
        <div className='shadow-lg p-4 rounded w-full mt-8'>
            <p className="text-lg font-bold">Top Performers</p>
            <div className="mt-4">
                <p className="">{"You have 10 influence's in your company."}</p>
            </div>
            <div className="flex gap-8 mt-8">
                <div className="">
                    <p className="font-bold text-lg">350</p>
                    <p className="text-sm text-slate-400">New Task</p>
                </div>
                <div className="">
                    <p className="font-bold text-lg">350</p>
                    <p className="text-sm text-slate-400">New Task</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <PerformersCard />
                <PerformersCard />
                <PerformersCard />
            </div>
        </div>
    )
}

export default Performers