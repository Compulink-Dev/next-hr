import FixedHeader from '@/app/(dashboard)/_components/FixedHeader'
import React from 'react'
import DataTable from '../../_components/DataTable'
import { getData } from '@/lib/apiResponse'

async function Customer() {

    const customers = await getData('suppliers')

    const data = customers.map((obj: any) => {
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
                link={'dashboard/purchase/suppliers/new'}
                title='Suppliers'
            />
            <div className="p-4">
                <DataTable data={data} columns={columns} updateLink='purchase/suppliers' resourceName='suppliers' />
            </div>
        </div>
    )
}

export default Customer