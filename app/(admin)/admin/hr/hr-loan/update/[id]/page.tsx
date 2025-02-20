import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";
import NewHeader from "@/app/(admin)/_components/newHeader";

//@ts-ignore
async function UpdateHrLoan({ params: { id } }) {
  const data = await getData(`loan/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Loan" link="hr/loans" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateHrLoan;
