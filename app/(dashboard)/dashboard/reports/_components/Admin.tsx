import React from 'react'
import UserInfo from './(admin)/UserInfo'
import UserAvailability from './(admin)/UserAvailability'
import { File, Shell } from 'lucide-react'
import InterviewCard from './(admin)/InterviewCard'
import UpcomingInterviews from './(admin)/UpcomingInterviews'
import Performers from './(admin)/Performers'

function Admin() {
    return (
        <div className='p-8'>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                    <UserInfo />
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <UserAvailability />
                        <UserAvailability />
                        <UserAvailability />
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="h-40 rounded w-full bg-blue-900 p-8">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white">
                                    <File className='text-blue-900' />
                                </div>
                                <div className="text-white py-2">
                                    <p className="text-2xl font-bold">53</p>
                                    <p className="text-sm">Applications</p>
                                </div>
                            </div>
                            <div className="">
                                <Shell className='text-5xl h-24 w-24 text-white' />
                            </div>
                        </div>
                    </div>
                    <InterviewCard />
                    <InterviewCard />
                    <div className="mt-4">
                        <UpcomingInterviews />
                    </div>
                </div>
            </div>
            <Performers />
        </div>
    )
}

export default Admin