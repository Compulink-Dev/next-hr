import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight, Plus, PlusCircle } from 'lucide-react'
import Link from 'next/link'


interface LinkProps {
    title: String
    links: any
    Icon: any
    href: any
}

function DropDownLink({ title, links, Icon, href }: LinkProps) {
    return (
        <Collapsible>
            <div className="hover:bg-blue-400 w-full rounded flex gap-1 items-center justify-between px-4 py-2'">
                <Link href={`/dashboard/${href}`} className='flex gap-2'>
                    <Icon className='w-4 h-4' />
                    <span className="text-sm">{title}</span>
                </Link>
                <CollapsibleTrigger className='px-4 py-2'>
                    <ChevronRight className='w-4 h-4' />
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                {
                    links.map((link: any, i: any) => (
                        <div
                            key={i}
                            className="flex items-center justify-between hover:bg-blue-400 transition-all duration-300  rounded mx-4 px-4 py-2">
                            <Link
                                key={link.title}
                                className=' flex gap-1 items-center lowercase'
                                href={`/dashboard/${link.href}`}>
                                <span className="text-sm capitalize">{link.title}</span>
                            </Link>
                            <Link href={`/dashboard/${link.href}/new`}>
                                <PlusCircle className='w-4 h-4' />
                            </Link>
                        </div>
                    ))
                }
            </CollapsibleContent>
        </Collapsible>

    )
}

export default DropDownLink