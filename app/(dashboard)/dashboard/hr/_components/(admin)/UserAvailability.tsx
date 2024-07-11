import { Boxes } from 'lucide-react'
import React from 'react'

const AvailabilityCard = () => {
    return (
        <div className="shadow-lg  w-full p-4 flex flex-col gap-2">
            <Boxes />
            <p className="font-bold">Attendance</p>
            <p className="text-sm text-slate-300">400</p>
        </div>
    )
}

function UserAvailability() {
    return (
        <div>
            <AvailabilityCard />
        </div>
    )
}

export default UserAvailability