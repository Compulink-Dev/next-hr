import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

function NewBrand() {
  return (
    <div className="">
      <NewHeader title="New Sales Order" link="sales/sales-order" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewBrand;
