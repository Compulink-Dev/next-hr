import NewHeader from "@/app/(dashboard)/_components/newHeader";
import React from "react";
import Form from "../_components/Form";

export default function NewTask() {
  return (
    <div>
      <NewHeader title="New Task" link="sales/tasks" />
      <div className="p-4">
        <Form />
      </div>
    </div>
  );
}