export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Employee() {
  const employee = await getData("employees");

  const data = employee.map((obj: any) => {
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
  });

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
        />
      </div>
    </div>
  );
}

export default Employee;
