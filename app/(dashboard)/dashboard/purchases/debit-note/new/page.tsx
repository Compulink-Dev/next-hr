import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

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
