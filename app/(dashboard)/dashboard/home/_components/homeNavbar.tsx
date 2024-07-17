'use client'
import { Building2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function HomeNavbar() {

    const pathname = usePathname()

    const navLinks = [
        {
            title: "Dashboard",
            href: "/dashboard/home/"
        },
        {
            title: "Getting Started",
            href: "/dashboard/home/getting-started"
        },
        {
            title: "Announcement",
            href: "/dashboard/home/announcement"
        },
        {
            title: "Updates",
            href: "/dashboard/home/updates"
        },
    ]


    return (
        <div className='h032 p-5 header-bg bg-slate-50 border-b border-slate-300'>
            <div className="flex space-x-3">
                <nav className="sticky mt-6 flex space-x-4">
                    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px">

                            {
                                navLinks.map((link: any, i: any) => (
                                    <li className="me-2" key={i}>
                                        <Link
                                            href={link.href}
                                            className={`${pathname === link.href ?
                                                "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" :
                                                "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                                }`}>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default HomeNavbar