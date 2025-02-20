import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

function NewBrand() {
  return (
    <div className="">
      <NewHeader title="New Credit Note" link="sales/credit-note" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewBrand;
