import { BarChart, Users } from 'lucide-react'
import React from 'react'

function InterviewCard() {
    return (
        <div className='shadow-lg px-8 py-2 mt-4 flex items-center justify-between rounded-md'>
            <div className="">
                <div className="p-4 rounded-full bg-blue-400">
                    <Users />
                </div>
                <div className="">
                    <p className="font-bold text-2xl">246</p>
                    <p className="text-sm text-slate-400">Interview</p>
                </div>
            </div>
            <div className="">
                <BarChart className='h-4 w-4 text-blue-900' />
            </div>
        </div>
    )
}

export default InterviewCard