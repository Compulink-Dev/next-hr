export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function SalesReport() {

    let salesReport;

    try {
        // Fetch data from the API
        salesReport = await getData('reports/sales');
    } catch (error) {
        console.error("Error fetching sales report:", error);
        salesReport = []; // Set to an empty array in case of error
    }

    const data = (salesReport || []).map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            vehicleId: obj.vehicleId,
            clientId: obj.clientId,
            productId: obj.productId,
            location: obj.location,
            time: obj.time,
            paymentType: obj.paymentType,
            amount: obj.amount,
            createdAt: obj.createdAt
        };
    });

    const columns = ['name', 'location', 'time', 'paymentType', 'amount', 'createdAt']

    return (
        <div>
            <FixedHeader
                link={'admin/reports/sales/new'}
                title='Sales Report'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='reports/sales' resourceName='sales' />
            </div>
        </div>
    )
}

export default SalesReport