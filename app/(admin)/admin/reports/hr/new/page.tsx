import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewHumanResourceReports() {
  return (
    <div className="">
      <NewHeader title="New report" link="reports/hr" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewHumanResourceReports;
