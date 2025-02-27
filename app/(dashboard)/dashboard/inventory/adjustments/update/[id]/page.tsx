import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import { getData } from "@/lib/apiResponse";

//@ts-ignore
async function UpdateAdjustments({ params: { id } }) {
  const data = await getData(`adjustments/${id}`);
  return (
    <div className="">
      <NewHeader title="New Adjustment" link="inventory/adjustment" />
      <div className=""></div>
    </div>
  );
}

export default UpdateAdjustments;
