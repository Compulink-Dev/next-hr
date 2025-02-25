import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateLoan({ params: { id } }) {
  const data = await getData(`loans/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Loan" link="hr/loans" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateLoan;
