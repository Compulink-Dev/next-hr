import { Button } from '@/components/ui/button'
import React from 'react'

function SubscriptionCard() {
    return (
        <div className='p-2 rounded mt-6 bg-slate-950 text-xs mb-6'>
            <h2 className="border-l-2 border-orange-600 pl-2 mb-1">Trail will expire
                <span className='pl-1 text-orange-600'>Subscribe</span>
            </h2>
            <div className="border-t pt-2 border-slate-300 flex items-center gap-2 justify-between">
                <Button>Change plan</Button>
                <Button>Upgrade</Button>
            </div>
        </div>
    )
}

export default SubscriptionCard