import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";
import { getData } from "@/lib/apiResponse";

async function NewBrand() {
  const categories = await getData("documents");

  return (
    <div className="">
      <NewHeader title="New Document" link="documents" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewBrand;
