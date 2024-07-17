'use client'
import React, { useState } from 'react'
import { BadgePercent, Boxes, Bus, Car, CarFront, Cog, Component, Factory, File, FileJson, FileSpreadsheet, FileStack, Frame, List, Merge, School, Shirt, User, UserRound, Warehouse } from 'lucide-react'
import OptionCard from '../../_components/OptionCard'


function Fleet
    () {

    const optionCards = [
        {
            title: 'Fleet',
            description: 'Create standalone fleet and services that you buy and sell',
            link: '/fleet',
            linkTitle: "New Fleet",
            enabled: true,
            icon: FileJson
        },
        {
            title: 'Invoices',
            description: 'Create standalone invoice and services that you buy and sell',
            link: '/invoices',
            linkTitle: "New Invoice",
            enabled: true,
            icon: File
        },
        {
            title: 'Vehicle',
            description: 'Create standalone vehicles and services that you buy and sell',
            link: '/vehicles',
            linkTitle: "New Vehicle",
            enabled: true,
            icon: Bus
        },
        {
            title: 'Drivers',
            description: 'Create standalone drivers and services that you buy and sell',
            link: '/drivers',
            linkTitle: "New Driver",
            enabled: true,
            icon: UserRound
        },
    ]

    return (
        <div className="">

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

export default Fleet
