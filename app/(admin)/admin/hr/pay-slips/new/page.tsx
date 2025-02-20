import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewPayslip() {
  return (
    <div className="">
      <NewHeader title="New Payslip" link="hr/pay-slips" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewPayslip;
