import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewDocument() {
  return (
    <div>
      <NewHeader title="New Document" link="documents" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}