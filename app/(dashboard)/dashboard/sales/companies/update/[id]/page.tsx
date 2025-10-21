import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import UpdateForm from "../../_components/UpdateForm";
import { getData } from "@/lib/apiResponse";

// @ts-ignore
async function UpdateCompany({ params: { id } }) {
  const data = await getData(`companies/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Company" link="sales/companies" />
      <div className="">
        <UpdateForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateCompany;