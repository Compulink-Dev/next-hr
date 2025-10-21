import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

// @ts-ignore
async function UpdateStage({ params: { id } }) {
  const data = await getData(`pipeline/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Stage" link="sales/pipeline" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateStage;