import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewCustomer() {
  return (
    <div className="">
      <NewHeader title="New Purchase Order" link="purchases/purchase-order" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewCustomer;
