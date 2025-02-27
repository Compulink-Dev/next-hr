export const dynamic = "force-dynamic";
// app/(admin)/employee/page.tsx
import React, { useEffect, useState } from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import DataTable from "@/app/(admin)/_components/DataTable";

async function Employee() {
  // Fetch employee data from your API
  const employees = await getData("employees");

  const data = Array.isArray(employees)
    ? employees.map((obj: any) => {
        return {
          id: obj.id,
          name: obj.name,
          email: obj.email,
          phone: obj.phone,
          address: obj.address,
          title: obj.title,
          appliedDate: obj.appliedDate,
          status: obj.status,
          createdAt: obj.createdAt,
        };
      })
    : [];

  const columns = [
    "name",
    "email",
    "phone",
    "address",
    "title",
    "appliedDate",
    "status",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader link={"/hr/employees/new"} title="Employee" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="hr/employees"
          resourceName="employees"
          filter="name"
        />
      </div>
    </div>
  );
}

export default Employee;
