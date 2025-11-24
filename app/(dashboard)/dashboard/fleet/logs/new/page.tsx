import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewDriver() {
  return (
    <div className="">
      <NewHeader title="New Logs" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewDriver;
