import React from 'react'
import CreateForm from './CreateForm'
import { getData } from '@/lib/apiResponse'


async function Form() {


    //@ts-ignore
    const categoryOptions = await getData('categories')

    const unitOptions = getData('units')


    const brandOptions = getData('brands')


    const supplierOptions = getData('suppliers')


    const warehouseOptions = getData('warehouse')



    const [category, unit, brand, warehouse, supplier] = await Promise.all([categoryOptions, unitOptions, brandOptions, warehouseOptions, supplierOptions])

    return (
        <div className="">
            <CreateForm
                category={category}
                unit={unit}
                supplier={supplier}
                brand={brand}
                warehouse={warehouse}
            />
        </div>
    )
}

export default Form