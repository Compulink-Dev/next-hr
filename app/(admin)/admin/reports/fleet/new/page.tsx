import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewFleetReport() {
  return (
    <div className="">
      <NewHeader title="New Fleet Report" link="reports/fleet" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewFleetReport;
