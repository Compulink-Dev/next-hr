import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewEvent() {
  return (
    <div>
      <NewHeader title="New Analytics Event" link="sales/analytics" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}