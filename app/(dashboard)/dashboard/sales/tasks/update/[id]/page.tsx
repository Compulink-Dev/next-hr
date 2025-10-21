import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

// @ts-ignore
async function UpdateTask({ params: { id } }) {
  const data = await getData(`tasks/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Task" link="sales/tasks" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateTask;