import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewCampaign() {
  return (
    <div>
      <NewHeader title="New Campaign" link="sales/campaigns" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}