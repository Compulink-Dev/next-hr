import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(admin)/_components/newHeader";

function NewCustomer() {
  return (
    <div className="">
      <NewHeader title="New Debit Order" link="purchases/debit-note" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewCustomer;
