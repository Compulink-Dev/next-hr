import React from 'react'
import CreateForm from './CreateForm'
import { getData } from '@/lib/apiResponse'



async function HeaderTabs() {


    const itemsData = getData('items')
    const warehouseData = getData('warehouse')
    const suppliersData = getData('suppliers')

    const [items, warehouse, suppliers] = await Promise.all([itemsData, warehouseData, suppliersData])

    return (
        //@ts-ignore
        <CreateForm items={items} warehouse={warehouse} suppliers={suppliers} />
    )
}

export default HeaderTabs