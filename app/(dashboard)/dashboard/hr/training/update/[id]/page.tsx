import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateTraining({ params: { id } }) {
  const data = await getData(`training/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Training" link="hr/training" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateTraining;
