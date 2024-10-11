import { Timer, User } from 'lucide-react'
import React from 'react'

const UpcomingCards = () => {
    return (
        <div className="border-b pb-4 mt-4">
            <div className="flex items-center justify-between">
                <div className="border h-10 w-10 flex items-center justify-center rounded-full">
                    <User />
                </div>
                <div className="">
                    <p className="font-bold text-md">Natalia Gibson</p>
                    <p className="text-sm text-slate-400">UI/UX Designer</p>
                </div>
            </div>
            <div className="mt-2 text-slate-400">
                <p className="text-xs flex items-center">
                    <Timer />
                    <span className="">
                        1-30 - 1-30
                    </span>
                </p>
            </div>
        </div>
    )
}

function UpcomingInterviews() {
    return (
        <div className='shadow-lg w-full p-4 rounded'>
            <p className='font-bold text-lg'>Upcoming Interview</p>
            <div className="mt-4">
                <UpcomingCards />
                <UpcomingCards />
            </div>
        </div>
    )
}

export default UpcomingInterviews