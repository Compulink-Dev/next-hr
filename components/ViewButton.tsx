import { Eye } from "lucide-react";
import React from "react";

function ViewButton() {
  return (
    <div className="flex items-center gap-1 text-blue-600 hover:text-blue-400 cursor-pointer">
      <Eye size={14} />
      <p className="">View</p>
    </div>
  );
}

export default ViewButton;
