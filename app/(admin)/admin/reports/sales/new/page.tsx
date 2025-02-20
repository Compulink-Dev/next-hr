import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

function NewSalesReport() {
  return (
    <div className="">
      <NewHeader title="New Sales Report" link="reports/sales" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewSalesReport;
