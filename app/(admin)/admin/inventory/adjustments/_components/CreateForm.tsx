'use client'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import Form from './Form'
import TransferForm from './TransferFrom'

//@ts-ignore
function CreateForm({ items, warehouse, suppliers }) {

    const tabs = [
        {
            title: 'Add Stock',
            icon: Plus,
            form: "add"
        },
        {
            title: 'Transfer Stock',
            icon: Minus,
            form: "transfer"
        },
    ]

    const Tab = ({ tab }: any) => {
        const Icon = tab.icon
        return (
            <li
                className="me-2">
                <Button
                    onClick={() => setActiveForm(tab.form)}
                    variant={'ghost'}
                    className={`${activeForm === tab.form ?
                        "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                        :
                        "inline-flex items-center justify-center p-4 text-blue-600 rounded-t-lg group"
                        }`}
                    aria-current="page"
                >
                    <Icon className='w-4 h-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300' />
                    <p className="pl-2">{tab.title}</p>
                </Button>
            </li>
        )
    }

    const [activeForm, setActiveForm] = useState('')


    return (
        <div className='px-4 mx-auto max-w-2xl'>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {
                        tabs.map((tab, i) => {
                            return (
                                <Tab
                                    key={i}
                                    tab={tab} />
                            )
                        })
                    }

                </ul>
            </div>

            <div className="">
                {
                    activeForm === "transfer" ? <TransferForm items={items} warehouse={warehouse} /> : <Form items={items} warehouse={warehouse} suppliers={suppliers} />
                }
            </div>
        </div>
    )
}

export default CreateForm