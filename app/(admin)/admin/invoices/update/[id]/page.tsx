import React from "react";
import { getData } from "@/lib/apiResponse";
import UpdateForm from "../../_components/UpdateForm";
import NewHeader from "@/app/(admin)/_components/newHeader";

//@ts-ignore
async function UpdateInvoice({ params: { id } }) {
  const data = await getData(`fleetInvoice/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Invoice" link="fleet/invoices" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateInvoice;
