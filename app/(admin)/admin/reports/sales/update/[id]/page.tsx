import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";
import NewHeader from "@/app/(admin)/_components/newHeader";

//@ts-ignore
async function UpdateSalesReport({ params: { id } }) {
  const data = await getData(`reports/sales/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Sales Report" link="reports/sales" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateSalesReport;
