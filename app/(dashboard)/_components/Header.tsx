'use client'
import { BellDot, History, LayoutGrid, Menu, Plus, Settings, Users2 } from 'lucide-react';
import React from 'react';
import SearchInput from './SearchInput';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { generateInitials } from '@/lib/initials';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

function Header({ setShowSide }: any) {
    const { data: session, status } = useSession(); // Fetch session data

    if (status === "loading") {
        return <p className="text-xs text-slate-500">Loading user...</p>;
    }

    const username = session?.user?.name?.split(' ')[0] || undefined;
    const initial = generateInitials(username);

    // Access the user's role from the session
    const userRole = session?.user?.role || "User";
    console.log("User Role:", userRole); // Log the user's role for debugging

    return (
        <div className='bg-slate-100 h-14 flex items-center justify-between px-4'>
            <div className="hidden md:flex items-center gap-4">
                <History className='w-4 h-4 text-slate-500' />
                <SearchInput />
            </div>
            <Button
                onClick={() => setShowSide(true)}
                variant={'ghost'} className="flex md:hidden hover:text-slate-400">
                <Menu className='w-5 h-5' />
            </Button>
            <div className="flex md:hidden">
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
                    {
                        session?.user?.image ? (
                            <Image
                                src={session.user.image} // Use the user's image if available
                                alt=''
                                height={96}
                                width={96}
                                className='w-8 h-8 rounded-full border border-slate-800'
                            />
                        )
                            : (
                                <Button
                                    variant={'ghost'}
                                    className=" items-center hover:bg-slate-300 hidden md:flex gap-1">
                                    {username}
                                </Button>
                            )
                    }
                    {/* Displaying the user role */}
                    {/* <span className='hidden md:flex items-center text-sm text-gray-600'>
                        Role: {userRole}
                    </span> */}
                    {
                        session?.user?.name ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className='hover:bg-slate-300 rounded-full bg-blue-500'
                                    >
                                        <span className=''>{initial}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="w-full p-8 flex flex-col gap-4 items-center justify-center">
                                        <DropdownMenuItem>
                                            <Link href={'/profile'}>Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={'/profile'}>Billing</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={'/profile'}>Subscriptions</Link>
                                        </DropdownMenuItem>
                                        <Button
                                            className='bg-blue-600 hover:bg-blue-400'
                                            onClick={() => signOut({
                                                redirect: true,
                                                callbackUrl: "/login"
                                            })}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            null
                        )
                    }

                    {/* <Button
                        className='hidden md:flex hover:bg-slate-300'
                        variant={'ghost'}>
                        <LayoutGrid className='h-4 w-4' />
                    </Button> */}
                </div>
            </div>
        </div>
    )
}

export default Header;
