import { Download } from "lucide-react";
import React from "react";

function DownloadButton() {
  return (
    <div className="flex items-center gap-1 text-blue-600 hover:text-blue-400 cursor-pointer p-2">
      <Download size={14} />
      <p className="">Download</p>
    </div>
  );
}

export default DownloadButton;
