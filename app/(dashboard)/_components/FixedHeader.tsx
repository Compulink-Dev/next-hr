import { Button } from '@/components/ui/button'
import { ChevronDown, HelpCircle, Layout, LayoutGrid, List, MoreHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function FixedHeader({ newlink }: any) {
    return (
        <div className='flex items-center justify-between p-4 bg-slate-50'>
            <Button className="bg-blue-600 hover:bg-blue-500">
                <span className="">All Items</span>
                <ChevronDown className='w-4 h-4 pl-1' />
            </Button>
            <div className="flex items-center gap-2">
                <Link
                    href={newlink}
                    className="bg-blue-600 hover:bg-blue-500 p-2 rounded-md flex items-center text-white text-sm">
                    <Plus className='w-3 h-3' />
                    <span className="">New</span>
                </Link>
                <div className="mr-2">
                    <button className="bg-slate-400 rounded-tl-md rounded-bl-md p-2 text-white">
                        <List className='w-5 h-5' />
                    </button>
                    <button className="bg-slate-500  rounded-tr-md rounded-br-md p-2 text-white">
                        <LayoutGrid className='w-5 h-5' />
                    </button>
                </div>
                <button className="bg-slate-400 rounded-md p-2 text-white">
                    <MoreHorizontal className='w-5 h-5' />
                </button>
                <button className="bg-orange-400  rounded-md p-2 text-white">
                    <HelpCircle className='w-5 h-5' />
                </button>
            </div>
        </div>
    )
}

export default FixedHeader