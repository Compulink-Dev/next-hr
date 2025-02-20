import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";
import { getData } from "@/lib/apiResponse";

async function NewBrand() {
  const categories = await getData("categories");

  return (
    <div className="">
      <NewHeader title="New Integrations" link="integrations" />
      <div className="">
        <Form categories={categories} />
      </div>
    </div>
  );
}

export default NewBrand;
