import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import { getData } from "@/lib/apiResponse";
import UpdateForm from "../../_components/UpdateForm";

//@ts-ignore
async function UpdateFleet({ params: { id } }) {
  const data = await getData(`fleetInvoice/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Tracking" link="fleet/tracking" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateFleet;
