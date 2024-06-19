import React from 'react'
import FixedHeader from '../../_components/FixedHeader'
import { BadgePercent, Boxes, Cog, Component, Frame, List, Merge, Shirt, Warehouse } from 'lucide-react'
import OptionCard from '../../_components/OptionCard'

function DashInventory() {

    const optionCards = [
        {
            title: 'Items',
            description: 'Create standalone items and services that you buy and sell',
            link: '/items',
            linkTitle: "New Item",
            enabled: true,
            icon: Shirt
        },
        {
            title: 'Categories',
            description: 'Create standalone items and services that you buy and sell',
            link: '/categories',
            linkTitle: "New Category",
            enabled: true,
            icon: Boxes
        },
        {
            title: 'Brands',
            description: 'Create standalone items and services that you buy and sell',
            link: '/brands',
            linkTitle: "New Bran",
            enabled: false,
            icon: Frame
        },
        {
            title: 'Adjustments',
            description: 'Create standalone items and services that you buy and sell',
            link: '/adjustments',
            linkTitle: "New Adjustment Item",
            enabled: false,
            icon: Cog
        },
        {
            title: 'Units',
            description: 'Create standalone items and services that you buy and sell',
            link: '/units',
            linkTitle: "New Units Item",
            enabled: false,
            icon: Merge
        },
        {
            title: 'Warehouse',
            description: 'Create standalone items and services that you buy and sell',
            link: '/warehouse',
            linkTitle: "New Warehouse Item",
            enabled: false,
            icon: Warehouse
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