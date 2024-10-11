import { Chrome } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

interface IntegrationCardProps {
    title: string;
    description: string;
    downloadLink: string;
}

function IntegrationCard({ title, description, downloadLink }: IntegrationCardProps) {
    return (
        <div className='w-full h-[150px] border rounded p-2'>
            <div className="flex items-center justify-between">
                <Chrome width={18} height={18} className='text-slate-600' />
                <Button variant={'outline'} size={'sm'}>
                    <a href={downloadLink} download>
                        Download
                    </a>
                </Button>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-lg font-bold">{title}</p>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
        </div>
    )
}

export default IntegrationCard;
