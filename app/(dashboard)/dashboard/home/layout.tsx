import React from 'react'
import HomeNavbar from './_components/homeNavbar'

function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=''>
            <HomeNavbar />
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}

export default HomeLayout