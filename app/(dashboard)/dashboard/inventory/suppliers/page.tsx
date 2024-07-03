import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'

import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Suppliers() {

    const suppliers = await getData('suppliers')

    const data = suppliers.map((obj: any) => {
        return {
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
                <DataTable data={data} columns={columns} />
            </div>
        </div>
    )
}

export default Suppliers