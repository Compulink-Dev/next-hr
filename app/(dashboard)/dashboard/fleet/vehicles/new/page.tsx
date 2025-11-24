import React from "react";
import Form from "../_components/Form";
import NewHeader from "@/app/(dashboard)/_components/newHeader";

function NewVehicle() {
  return (
    <div className="">
      <NewHeader title="New Vehicle" />
      <div className="">
        <Form />
      </div>
    </div>
  );
}

export default NewVehicle;
