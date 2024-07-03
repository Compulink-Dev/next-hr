import { BellDot, ChevronDown, History, LayoutGrid, Plus, RefreshCcwDotIcon, RefreshCw, Settings, User, User2Icon, Users2 } from 'lucide-react'
import React from 'react'
import SearchInput from './SearchInput'
import { Button } from '@/components/ui/button'


function Header() {
    return (
        <div className='bg-slate-100 h-14 flex items-center justify-between px-4'>
            <div className="hidden md:flex items-center gap-4">
                <History className='w-6 h-6' />
                <SearchInput />
            </div>
            <div className="flex items-center gap-3 ">
                <div className="items-center gap-2 hidden md:flex ">
                    <button className='bg-blue-600 hover:bg-blue-400 p-1 rounded-lg text-white'>
                        <Plus className='h-4 w-4' />
                    </button>
                    <button className=' hover:bg-slate-300 p-1.5 rounded-lg border-l border-slate-300'>
                        <Users2 className='h-4 w-4' />
                    </button>
                    <button className=' hover:bg-slate-300 p-1.5 rounded-lg'>
                        <BellDot className='h-4 w-4' />
                    </button>
                    <button className=' hover:bg-slate-300 p-1.5 rounded-lg border-r border-slate-300'>
                        <Settings className='h-4 w-4' />
                    </button>
                </div>
                <div className="flex items-center">
                    <Button
                        variant={'ghost'}
                        className="flex items-center hover:bg-slate-300">
                        Grant
                        <ChevronDown className='w-3 h-3' />
                    </Button>
                    <Button
                        className='hover:bg-slate-300'
                        variant={'ghost'}>
                        <User className='h-4 w-4' />
                    </Button>
                    <Button
                        className='hover:bg-slate-300'
                        variant={'ghost'}>
                        <LayoutGrid className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header