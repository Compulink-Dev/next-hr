import { Chrome } from 'lucide-react'
import React from 'react'

function IntegrationCard({ name, subtitle, attachment }: any) {
    return (
        <div className='w-full h-[150px] border rounded p-2'>
            <div className="flex items-center justify-between">
                <Chrome width={18} height={18} className='text-slate-600' />
                <div className="border p-1 text-xs rounded-lg">{attachment}</div>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-lg font-bold">{name}</p>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </div>
    )
}

export default IntegrationCard