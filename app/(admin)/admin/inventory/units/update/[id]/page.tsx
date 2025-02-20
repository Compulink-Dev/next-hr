import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateUnit({ params: { id } }) {
  const data = await getData(`units/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Unit" link="inventory/units" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateUnit;
