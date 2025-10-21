import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

// @ts-ignore
async function UpdateDeal({ params: { id } }) {
  const data = await getData(`deals/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Deal" link="sales/deals" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateDeal;