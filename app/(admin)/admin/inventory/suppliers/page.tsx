export const dynamic = "force-dynamic"
import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import { getData } from '@/lib/apiResponse'
import DataTable from '@/app/(admin)/_components/DataTable'

async function Suppliers() {

    const suppliers = await getData('suppliers')

    const data = suppliers.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            phone: obj.phone,
            email: obj.email,
            address: obj.address,
            contactPerson: obj.contactPerson,
            supplierCode: obj.supplierCode,
            paymentTerms: obj.paymentTerms,
            taxID: obj.taxID,
            notes: obj.notes,
        }
    })

    const columns = ['name', 'phone', 'email', 'address', 'contactPerson', 'supplierCode', 'paymentTerms', 'taxID', 'notes']

    return (
        <div>
            <FixedHeader
                link={'dashboard/inventory/suppliers/new'}
                title='suppliers'
            />
            <div className="my-4 p-8">
                <DataTable data={data} columns={columns} updateLink={'inventory/suppliers'} resourceName='suppliers' />
            </div>
        </div>
    )
}

export default Suppliers