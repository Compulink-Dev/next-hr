import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewBrand() {
  return (
    <div className="">
      <NewHeader title="New Brand" link="inventory" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewBrand;
