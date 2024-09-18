import React from 'react'

function Card({ value, title, subtitle }: any) {
    return (
        <div className='h-40 rounded border w-full p-4'>
            <div className="flex gap-4 items-center">
                <div className="bg-blue-500 rounded h-20 w-20 flex items-center justify-center">
                    <p className="font-bold text-4xl text-white">{value}</p>
                </div>
                <div className="space-y-2">
                    <p className="font-bold text-lg text-slate-600">{title}</p>
                    <p className="text-slate-400 text-sm">{subtitle}</p>
                </div>
            </div>
        </div>
    )
}

export default Card