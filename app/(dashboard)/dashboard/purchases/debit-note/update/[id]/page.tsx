import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateDebitNote({ params: { id } }) {
  const data = await getData(`debitnote/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Debit Note" link="purchases/debit-note" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateDebitNote;
