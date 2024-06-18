import React from 'react'
import FixedHeader from '../../_components/FixedHeader'
import { BadgePercent, Boxes, Component, List, Shirt } from 'lucide-react'
import OptionCard from '../../_components/OptionCard'

function DashInventory() {

    const optionCards = [
        {
            title: 'Items',
            description: 'Create standalone items and services that you buy and sell',
            link: '/new',
            linkTitle: "New Item",
            enabled: true,
            icon: Shirt
        },
        {
            title: 'Item Groups',
            description: 'Create standalone items and services that you buy and sell',
            link: '/new',
            linkTitle: "New Item",
            enabled: true,
            icon: Boxes
        },
        {
            title: 'Composite Items',
            description: 'Create standalone items and services that you buy and sell',
            link: '/new',
            linkTitle: "New Composite Item",
            enabled: false,
            icon: Component
        },
        {
            title: 'Price List',
            description: 'Create standalone items and services that you buy and sell',
            link: '/new',
            linkTitle: "New Composite Item",
            enabled: false,
            icon: BadgePercent
        },
    ]

    return (
        <div className=''>
            <FixedHeader newlink={'/dashboard/inventory/items/new'} />
            <div className="p-8 grid grid-col-1 lg:grid-cols-2 gap-4">
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