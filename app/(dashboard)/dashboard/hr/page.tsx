'use client'
import React, { useState } from 'react'
import Admin from './_components/Admin'
import Users from './_components/Users'
import { BadgePercent, Boxes, Cog, Component, Factory, File, FileJson, FileSpreadsheet, FileStack, Frame, List, Merge, School, Shirt, User, Warehouse } from 'lucide-react'
import OptionCard from './_components/OptionCard'



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
            linkTitle: "New Certification Item",
            enabled: true,
            icon: FileSpreadsheet
        },
        {
            title: 'Training',
            description: 'Create standalone items and services that you buy and sell',
            link: '/Training',
            linkTitle: "New Training Item",
            enabled: true,
            icon: School
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
            linkTitle: "New Employee Item",
            enabled: true,
            icon: User
        },
        {
            title: 'Certification',
            description: 'Create standalone certification and services that you buy and sell',
            link: '/certification',
            linkTitle: "New Certification Item",
            enabled: true,
            icon: FileSpreadsheet
        },
        {
            title: 'Training',
            description: 'Create standalone items and services that you buy and sell',
            link: '/Training',
            linkTitle: "New Training Item",
            enabled: true,
            icon: School
        },
    ]

    const [admin, setAdmin] = useState(false)

    return (
        <div className="">
            {
                !admin ? (
                    <div className="p-8 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
