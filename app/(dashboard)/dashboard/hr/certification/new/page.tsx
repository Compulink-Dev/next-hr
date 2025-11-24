import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

function NewCertification() {
  return (
    <div className="">
      <NewHeader title="New certification" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewCertification;
