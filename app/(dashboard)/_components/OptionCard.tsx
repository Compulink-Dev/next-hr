import { Shirt } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

//@ts-ignore
function OptionCard({ optionData }) {

    const { title, description, link, linkTitle, enabled, icon: Icon } = optionData
    return (
        <div className="shadow-md bg-white p-4 flex flex-col items-center rounded">
            <h2 className="font-bold text-xl">{title}</h2>
            <div className="">
                <Icon className='w-36 h-36' strokeWidth=".5px" />
            </div>
            <p className="line-clamp-1 my-4 text-xs">
                {description}
            </p>
            {
                enabled ? (
                    <Link
                        href={link}
                        className='bg-blue-600 text-sm text-white hover:bg-blue-400 px-4 py-2 rounded'>
                        {linkTitle}
                    </Link>
                ) : (
                    <button
                        className="py-2 px-4 text-sm rounded sm bg-blue-600 px-3 inline-flex items-center space-x-2 text-white">
                        Enabled
                    </button>
                )
            }


        </div>
    )
}

export default OptionCard