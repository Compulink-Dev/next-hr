import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateFleetReports({ params: { id } }) {
  const data = await getData(`reports/fleet/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Fleet Report" link="reports/fleet" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateFleetReports;
