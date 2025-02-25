import { Pen } from "lucide-react";
import React from "react";

function EditButton() {
  return (
    <div className="flex items-center gap-1 text-blue-600 hover:text-blue-400 cursor-pointer">
      <Pen size={14} />
      <p className="">Edit</p>
    </div>
  );
}

export default EditButton;
