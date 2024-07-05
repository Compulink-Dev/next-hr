'use client'
import React, { useState } from 'react'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [showSide, setShowSide] = useState(false)
    return (
        <div className='bg-white flex'>
            <Sidebar showSide={showSide} setShowSide={setShowSide} />
            <main className="w-full md:pl-60 min-h-screen">
                <Header setShowSide={setShowSide} />
                <div className="">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout