import React from "react";
import { getData } from "@/lib/apiResponse";
import UpdateForm from "../../_components/UpdateForm";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

//@ts-ignore
async function UpdateDriver({ params: { id } }) {
  const data = await getData(`logs/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Logs" link="fleet/logs" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateDriver;
