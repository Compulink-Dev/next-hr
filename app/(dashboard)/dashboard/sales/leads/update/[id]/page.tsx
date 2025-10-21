import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

// @ts-ignore
async function UpdateLead({ params: { id } }) {
  const data = await getData(`leads/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Lead" link="sales/leads" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateLead;