export const dynamic = "force-dynamic";
import React from "react";
import HeaderTabs from "../_components/HeaderTabs";
import NewHeader from "@/app/(admin)/_components/newHeader";

function NewAdjustment() {
  return (
    <div className="">
      <NewHeader title="New Adjustment" link="inventory" />
      <div>
        <HeaderTabs />
      </div>
    </div>
  );
}

export default NewAdjustment;
