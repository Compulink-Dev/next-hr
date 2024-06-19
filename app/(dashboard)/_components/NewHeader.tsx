import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NewHeader({ title, link }: any) {
    return (
        <div className="flex items-center justify-between bg-white py-3 px-4">
            <h2 className="font-bold">{title}</h2>
            <Link href={`/dashboard/${link}`}>
                <X />
            </Link>
        </div>
    )
}

export default NewHeader