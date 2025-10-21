import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewStage() {
  return (
    <div>
      <NewHeader title="New Stage" link="sales/pipeline" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}