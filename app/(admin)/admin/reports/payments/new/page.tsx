import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewPaymentReports() {
  return (
    <div className="">
      <NewHeader title="New payment report" link="report/payments" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewPaymentReports;
