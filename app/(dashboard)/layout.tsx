import React from 'react'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-white flex'>
            <Sidebar />
            <main className="w-full min-h-screen">
                <Header />
                <div className="">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout