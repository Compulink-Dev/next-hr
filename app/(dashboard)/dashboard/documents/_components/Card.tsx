import { Chrome } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

interface IntegrationCardProps {
    name: string;
    subTitle: string;
    attachment: string;
}

function IntegrationCard({ name, subTitle, attachment }: IntegrationCardProps) {
    return (
        <div className='w-full h-[150px] border rounded p-2'>
            <div className="flex items-center justify-between">
                <Chrome width={18} height={18} className='text-slate-600' />
                <Button variant={'outline'} size={'sm'}>
                    <a href={attachment} download>
                        Download
                    </a>
                </Button>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-lg font-bold">{name}</p>
                <p className="text-xs text-slate-500">{subTitle}</p>
            </div>
        </div>
    )
}

export default IntegrationCard;
