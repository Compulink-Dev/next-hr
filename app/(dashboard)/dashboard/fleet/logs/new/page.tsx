import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewDriver() {
  return (
    <div className="">
      <NewHeader title="New Logs" link="fleet/logs" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewDriver;
