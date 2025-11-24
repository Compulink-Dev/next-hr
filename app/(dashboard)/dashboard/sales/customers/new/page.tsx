import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

function NewCustomer() {
  return (
    <div className="">
      <NewHeader title="New Customer" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewCustomer;
