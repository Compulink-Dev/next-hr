import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";
import NewHeader from "@/app/(dashboard)/_components/newHeader";
//@ts-ignore
async function UpdateCategory({ params: { id } }) {
  const data = await getData(`certification/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Certificate" link="hr/certification" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateCategory;
