'use client'
import React, { useState } from 'react'
import Admin from './_components/Admin'
import Users from './_components/Users'
import { BadgeDollarSign, BadgePercent, Boxes, Bus, Cog, Component, Factory, File, FileJson, FileSpreadsheet, FileStack, Frame, List, Merge, School, Shirt, User, Warehouse } from 'lucide-react'
import OptionCard from './_components/OptionCard'
import Card from './_components/Card'



function Reports
    () {

    const optionCards = [
        {
            title: 'Sales',
            description: 'Create standalone loan and services that you buy and sell',
            link: '/sales',
            linkTitle: "New Sale",
            enabled: true,
            icon: BadgeDollarSign
        },
        {
            title: 'Purchase',
            description: 'Create standalone leave and services that you buy and sell',
            link: '/purchase',
            linkTitle: "New Purchase",
            enabled: true,
            icon: File
        },
        {
            title: 'Fleet',
            description: 'Create standalone items and services that you buy and sell',
            link: '/fleet',
            linkTitle: "New Fleet",
            enabled: true,
            icon: Bus
        },
        {
            title: 'H.R',
            description: 'Create standalone H.R and services that you buy and sell',
            link: '/hr',
            linkTitle: "New H.R",
            enabled: true,
            icon: User
        },
        {
            title: 'Receipts',
            description: 'Create standalone items and services that you buy and sell',
            link: '/receipts',
            linkTitle: "New Receipts",
            enabled: true,
            icon: FileSpreadsheet
        },
        {
            title: 'Payments',
            description: 'Create standalone items and services that you buy and sell',
            link: '/payments',
            linkTitle: "New Payments",
            enabled: true,
            icon: BadgeDollarSign
        },
        {
            title: 'Projects',
            description: 'Create standalone items and services that you buy and sell',
            link: '/projects',
            linkTitle: "New Projects",
            enabled: true,
            icon: FileSpreadsheet
        },
    ]

    const adminCards = [
        {
            title: 'Loan',
            description: 'Create standalone loan and services that you buy and sell',
            link: '/loans',
            linkTitle: "New Loan",
            enabled: true,
            icon: FileJson
        },
        {
            title: 'Leave Forms',
            description: 'Create standalone leave and services that you buy and sell',
            link: '/leaves',
            linkTitle: "New Leave",
            enabled: true,
            icon: File
        },
        {
            title: 'Payslips',
            description: 'Create standalone items and services that you buy and sell',
            link: '/payslips',
            linkTitle: "New Payslips",
            enabled: true,
            icon: FileStack
        },

        {
            title: 'Employees',
            description: 'Create standalone items and services that you buy and sell',
            link: '/employees',
            linkTitle: "New Employee",
            enabled: true,
            icon: User
        },
        {
            title: 'Certification',
            description: 'Create standalone certification and services that you buy and sell',
            link: '/certification',
            linkTitle: "New Certification",
            enabled: true,
            icon: FileSpreadsheet
        },
        {
            title: 'Training',
            description: 'Create standalone items and services that you buy and sell',
            link: '/Training',
            linkTitle: "New Training ",
            enabled: true,
            icon: School
        },
    ]

    const [admin, setAdmin] = useState(false)

    return (
        <div className="">
            <div className="p-8">
                <div className="h-auto border p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded">
                    <Card
                        value={'10'}
                        title={'Reports reviewed'}
                        subtitle={'Reviewed pending approval'}
                    />
                    <Card
                        value={'0'}
                        title={'Reports pending'}
                        subtitle={'Reports still in progress'}
                    />
                    <Card
                        value={'0'}
                        title={'Reports completed'}
                        subtitle={'Approve reports'}
                    />
                    {/* <Card
                        value={'0'}
                        title={'Overtime applied'}
                        subtitle={'Allowed for overtime application'}
                    /> */}
                </div>
            </div>
            {
                !admin ? (
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            optionCards.map((card, i) => (
                                <OptionCard
                                    key={i}
                                    optionData={card}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className="p-8 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            adminCards.map((card, i) => (
                                <OptionCard
                                    key={i}
                                    optionData={card}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Reports
