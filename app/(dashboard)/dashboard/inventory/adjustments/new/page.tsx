
import NewHeader from '@/app/(dashboard)/_components/NewHeader'
import React from 'react'
import HeaderTabs from '../_components/HeaderTabs'

function NewAdjustment() {
    return (
        <div className=''>
            <NewHeader title='New Adjustment' link='inventory' />
            <div>
                <HeaderTabs />
            </div>
        </div>
    )
}

export default NewAdjustment