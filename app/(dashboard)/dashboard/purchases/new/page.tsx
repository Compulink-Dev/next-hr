import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewBrand() {
  return (
    <div className="">
      <NewHeader title="New Purchase" link="purchases" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewBrand;
