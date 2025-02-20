import BackButton from "@/components/BackButton";
import React from "react";

function NewHeader({ title }: any) {
  return (
    <div className="mx-auto container flex items-center justify-between bg-white p-8">
      <h2 className="font-bold">{title}</h2>
      <BackButton />
    </div>
  );
}

export default NewHeader;
