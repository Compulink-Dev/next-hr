import React from 'react'
import CreateForm from './CreateForm'
import { getData } from '@/lib/apiResponse'



async function HeaderTabs() {


    const itemsData = getData('items')
    const warehouseData = getData('warehouse')

    const [items, warehouse] = await Promise.all([itemsData, warehouseData])

    return (
        //@ts-ignore
        <CreateForm items={items} warehouse={warehouse} />
    )
}

export default HeaderTabs