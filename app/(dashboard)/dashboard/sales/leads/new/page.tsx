import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewLead() {
  return (
    <div>
      <NewHeader title="New Lead" link="sales/leads" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}