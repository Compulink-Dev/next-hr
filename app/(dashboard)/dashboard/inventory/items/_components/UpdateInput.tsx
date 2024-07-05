import React from 'react'
import UpdateForm from './UpdateForm'
import { getData } from '@/lib/apiResponse'

async function UpdateInput({ initialData }: any) {

    const categoryOptions = await getData('categories')

    const unitOptions = getData('units')


    const brandOptions = getData('brands')


    const supplierOptions = getData('suppliers')


    const warehouseOptions = getData('warehouse')

    const [category, unit, brand, warehouse, supplier] = await Promise.all([categoryOptions, unitOptions, brandOptions, warehouseOptions, supplierOptions])

    return (
        <div>
            <UpdateForm
                initialData={initialData}
                category={category}
                unit={unit}
                brand={brand}
                warehouse={warehouse}
                supplier={supplier}
            />
        </div>
    )
}

export default UpdateInput