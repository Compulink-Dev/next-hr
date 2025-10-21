import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewCompany() {
  return (
    <div>
      <NewHeader title="New Company" link="sales/companies" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}