import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewTraining() {
  return (
    <div className="">
      <NewHeader title="New Training" link="hr/training" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewTraining;
