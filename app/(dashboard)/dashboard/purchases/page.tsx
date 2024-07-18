import React from 'react'
import FixedHeader from '../../_components/FixedHeader'
import { BadgeDollarSign, BadgePercent, Boxes, CircleUserRound, Cog, Component, Factory, Frame, List, Merge, Notebook, Shirt, StickyNote, User, UserRound, Warehouse } from 'lucide-react'
import OptionCard from './_components/OptionCard'


function DashInventory() {

    const optionCards = [
        {
            title: 'Suppliers',
            description: 'Create standalone items and services that you buy and sell',
            link: '/suppliers',
            linkTitle: "New Supplier",
            enabled: true,
            icon: UserRound
        },
        {
            title: 'Sales order',
            description: 'Create standalone items and services that you buy and sell',
            link: '/sales-order',
            linkTitle: "New Order",
            enabled: true,
            icon: BadgeDollarSign
        },
        {
            title: 'Invoices',
            description: 'Create standalone items and services that you buy and sell',
            link: '/invoices',
            linkTitle: "New Invoice",
            enabled: true,
            icon: Notebook
        },
        {
            title: 'Debit Note',
            description: 'Create standalone items and services that you buy and sell',
            link: '/debitnote',
            linkTitle: "New Debit Note",
            enabled: true,
            icon: StickyNote
        },

    ]

    return (
        <div className=''>
            <FixedHeader newlink={'/dashboard/purchases/customers/new'} />
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
        </div>
    )
}

export default DashInventory