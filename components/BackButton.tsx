"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      onClick={() => router.back()}
      className="flex gap-2 items-center"
    >
      <ChevronLeft size={14} />
      <p className="">Back</p>
    </Button>
  );
}

export default BackButton;
