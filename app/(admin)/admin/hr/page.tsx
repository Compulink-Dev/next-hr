'use client'
import React, { useState } from 'react'
import Admin from './_components/Admin'
import Users from './_components/Users'
import { BadgePercent, Boxes, Cog, Component, Factory, File, FileJson, FileSpreadsheet, FileStack, Frame, List, Merge, School, Shirt, User, Warehouse } from 'lucide-react'
import OptionCard from './_components/OptionCard'
import Card from './_components/Card'



function HumanResource
    () {

    const optionCards = [
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
            linkTitle: "New Training",
            enabled: true,
            icon: School
        },
        {
            title: 'Job Cards',
            description: 'Create standalone items and services that you buy and sell',
            link: '/job-cards',
            linkTitle: "New Job Cards",
            enabled: true,
            icon: FileStack
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
                        title={'Leave applied'}
                        subtitle={'2 days balance'}
                    />
                    <Card
                        value={'0'}
                        title={'Loan applied'}
                        subtitle={'Apply available'}
                    />
                    <Card
                        value={'0'}
                        title={'Advance applied'}
                        subtitle={'Allowed for advance application'}
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

export default HumanResource
