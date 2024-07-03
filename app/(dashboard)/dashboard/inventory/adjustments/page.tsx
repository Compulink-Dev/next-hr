import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Adjustments() {

    const addAdjustmentsData = getData('adjustments/add')
    const transferAdjustmentsData = getData('adjustments/transfer')

    const [addAdjustments, transferAdjustments] = await Promise.all([addAdjustmentsData, transferAdjustmentsData])

    const data = addAdjustments.map((obj: any) => {
        return {
            referenceNumber: obj.referenceNumber,
            addStockQty: obj.addStockQty
        }
    })

    const transfer = transferAdjustments.map((obj: any) => {
        return {
            referenceNumber: obj.referenceNumber,
            transferStockQty: obj.transferStockQty
        }
    })

    const columns = ['referenceNumber', 'addStockQty']
    const transferColumns = ['referenceNumber', 'transferStockQty']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/adjustments/new'}
                title='adjustments'
            />
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4 capitalize">Stock increment adjustments</h2>
                <DataTable data={data} columns={columns} />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4 capitalize">Stock transfer adjustments</h2>
                <DataTable data={transfer} columns={transferColumns} />
            </div>
        </div>
    )
}

export default Adjustments