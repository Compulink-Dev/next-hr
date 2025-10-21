import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewDeal() {
  return (
    <div>
      <NewHeader title="New Deal" link="sales/deals" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}