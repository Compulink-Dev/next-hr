import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(admin)/_components/newHeader";

function NewCertification() {
  return (
    <div className="">
      <NewHeader title="New certification" link="hr/certification" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewCertification;
