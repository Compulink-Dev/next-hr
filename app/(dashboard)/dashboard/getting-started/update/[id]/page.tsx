import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateBrands({ params: { id } }) {
  const data = await getData(`brands/${id}`);
  return (
    <div className="">
      <NewHeader title="New Brand" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateBrands;
