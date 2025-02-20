import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewCustomer() {
  return (
    <div className="">
      <NewHeader title="New Leave" link="hr/leave" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewCustomer;
