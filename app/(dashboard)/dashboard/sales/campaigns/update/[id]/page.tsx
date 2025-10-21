import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

// @ts-ignore
async function UpdateCampaign({ params: { id } }) {
  const data = await getData(`campaigns/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Campaign" link="sales/campaigns" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateCampaign;