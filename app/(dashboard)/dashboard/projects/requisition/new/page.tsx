import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewInvoice() {
  return (
    <div className="">
      <NewHeader title="New Requisition" link="projects/requisition" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewInvoice;
