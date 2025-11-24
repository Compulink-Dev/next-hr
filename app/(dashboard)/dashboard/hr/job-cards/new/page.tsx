import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

function NewEmployee() {
  return (
    <div className="">
      <NewHeader title="New employee" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewEmployee;
