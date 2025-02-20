import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";
import NewHeader from "@/app/(admin)/_components/newHeader";

//@ts-ignore
async function UpdatePurchase({ params: { id } }) {
  const data = await getData(`purchases/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Purchase" link="purchases/purchase-order" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdatePurchase;
