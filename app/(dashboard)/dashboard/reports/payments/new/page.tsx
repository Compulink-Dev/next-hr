import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

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
