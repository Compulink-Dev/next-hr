import React from 'react'
import { BadgePercent, Boxes, Cog, Component, Factory, Frame, List, Merge, Shirt, User, Warehouse } from 'lucide-react'
import OptionCard from '../../_components/OptionCard'
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'

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
            enabled: true,
            icon: Frame
        },
        {
            title: 'Adjustments',
            description: 'Create standalone items and services that you buy and sell',
            link: '/adjustments',
            linkTitle: "New Adjustment Item",
            enabled: true,
            icon: Cog
        },
        {
            title: 'Units',
            description: 'Create standalone items and services that you buy and sell',
            link: '/units',
            linkTitle: "New Units Item",
            enabled: true,
            icon: Merge
        },
        {
            title: 'Warehouse',
            description: 'Create standalone items and services that you buy and sell',
            link: '/warehouse',
            linkTitle: "New Warehouse Item",
            enabled: true,
            icon: Warehouse
        },
        {
            title: 'Supplier',
            description: 'Create standalone items and services that you buy and sell',
            link: '/suppliers',
            linkTitle: "New Supplier",
            enabled: true,
            icon: Factory
        },
    ]

    return (
        <div className=''>
            <FixedHeader newlink={'/dashboard/inventory/items/new'} />
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