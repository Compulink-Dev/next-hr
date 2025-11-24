export const dynamic = "force-dynamic";
import React from "react";
import HeaderTabs from "../_components/HeaderTabs";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

function NewAdjustment() {
  return (
    <div className="">
      <NewHeader title="New Adjustment" />
      <div>
        <HeaderTabs />
      </div>
    </div>
  );
}

export default NewAdjustment;
