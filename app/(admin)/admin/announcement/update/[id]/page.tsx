export const dynamic = "force-dynamic";
import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateBrands({ params: { id } }) {
  const data = await getData(`brands/${id}`);
  return (
    <div className="">
      <NewHeader title="New Brand" link="inventory/brands" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateBrands;
