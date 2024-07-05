import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Items() {

    const items = await getData('items')

    const data = items.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            description: obj.description,
            categoryId: obj.categoryId,
            sku: obj.sku,
            barcode: obj.barcode,
            quantity: obj.quantity,
            unitId: obj.unitId,
            brandId: obj.brandId,
            supplierId: obj.supplierId,
            warehouseId: obj.warehouseId,
            sellingPrice: obj.sellingPrice,
            buyingPrice: obj.buyingPrice,
            reOrderPoint: obj.reOrderPoint,
            weight: obj.weight,
            imageUrl: obj.imageUrl,
            dimensions: obj.dimensions,
            taxRate: obj.taxRate,
            notes: obj.notes,
            categoryName: obj.category.name
        }
    })

    const columns = ['imageUrl', 'name', 'description', 'categoryId', 'sku', 'barcode', 'quantity', 'unitId', 'brandId', 'supplierId', 'warehouseId', 'sellingPrice', 'buyingPrice', 'reOrderPoint', 'weight', 'dimensions', 'taxRate', 'notes', 'categoryName']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/items/new'}
                title='Items'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink={'inventory/items'} resourceName='items' />
            </div>
        </div>
    )
}

export default Items