export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(admin)/_components/DataTable";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";

async function Customer() {
  const customers = await getData("suppliers");

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
    };
  });

  const columns = [
    "name",
    "phone",
    "email",
    "address",
    "contactPerson",
    "supplierCode",
    "paymentTerms",
    "taxID",
    "notes",
  ];

  return (
    <div>
      <FixedHeader link={"admin/purchase/suppliers/new"} title="Suppliers" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="purchase/suppliers"
          resourceName="suppliers"
        />
      </div>
    </div>
  );
}

export default Customer;
