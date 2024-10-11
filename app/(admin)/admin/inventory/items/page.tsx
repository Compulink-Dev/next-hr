export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function Items() {
    try {
        const items = await getData('items');

        if (!items || !Array.isArray(items)) {
            // Handle the case where items are undefined, null, or not an array
            console.error("Items data is either undefined or not an array");
            return <div className='p-4'>No items available</div>;
        }

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
                categoryName: obj.category.name,
                warehouse: obj.warehouse.name
            }
        })

        const columns = ['imageUrl', 'name', 'description', 'categoryId', 'sku', 'barcode', 'quantity', 'unitId', 'brandId', 'supplierId', 'warehouseId', 'sellingPrice', 'buyingPrice', 'reOrderPoint', 'weight', 'dimensions', 'taxRate', 'notes', 'categoryName', 'warehouse']

        return (
            <div className=''>
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
    catch (error) {
        console.error('Failed to fetch items:', error);
        return <div>Failed to load items. Please try again later.</div>;
    }
}


export default Items