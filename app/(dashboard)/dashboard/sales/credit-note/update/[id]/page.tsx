import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateCreditNote({ params: { id } }) {
  const data = await getData(`credit-notes/${id}`);
  return (
    <div className="">
      <NewHeader title="New Credit Note" link="inventory/credit-notes" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateCreditNote;
