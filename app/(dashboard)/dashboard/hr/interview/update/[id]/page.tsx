import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

//@ts-ignore
async function UpdateCategory({ params: { id } }) {
  const data = await getData(`interviews/${id}`);

  console.log("Update data :", data);

  return (
    <div className="">
      <NewHeader title="Update Interview" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateCategory;
