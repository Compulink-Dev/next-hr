// app/(dashboard)/hr/employees/page.tsx
export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";
import Forbidden from "@/components/Forbidden";

async function Employee() {
  const { data: employee, status } = await getDataWithStatus("employees");

  const data = Array.isArray(employee)
    ? employee.map((obj: any) => {
        return {
          id: obj.id,
          name: obj.user?.name || obj.name, // Use user name if available
          email: obj.user?.email || obj.email, // Use user email if available
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

  if (status === 401 || status === 403) {
    return (
      <div className="p-6">
        <Forbidden message="You don't have permission to view Employees." />
      </div>
    );
  }

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
