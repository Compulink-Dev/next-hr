export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(admin)/_components/DataTable";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";

async function Customer() {
  const customers = await getData("customers");

  const data = customers.map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      phone: obj.phone,
      email: obj.email,
      address: obj.address,
      company: obj.company,
      notes: obj.notes,
      createdAt: obj.createdAt,
    };
  });

  const columns = [
    "name",
    "phone",
    "email",
    "address",
    "company",
    "notes",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader link={"admin/purchases/debit-note/new"} title="Customers" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="purchases/debit-note"
          resourceName="purchases"
        />
      </div>
    </div>
  );
}

export default Customer;
