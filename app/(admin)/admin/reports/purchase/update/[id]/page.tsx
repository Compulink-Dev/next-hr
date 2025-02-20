import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdatePurchaseReport({ params: { id } }) {
  const data = await getData(`reports/purchase/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Purchase" link="reports/purchase" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdatePurchaseReport;
