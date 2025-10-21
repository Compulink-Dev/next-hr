"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import TextareaInput from "../../../inventory/_components/TextArea";
import ImageInput from "@/app/(dashboard)/_components/UploadThing";

interface RequisitionFormData {
  name: string;
  purpose: string;
  amount: number;
  projectId?: string;
}

function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequisitionFormData>();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: RequisitionFormData) {
    setLoading(true);
    try {
      const payload = {
        name: data.name.trim(),
        purpose: data.purpose.trim(),
        amount: parseFloat(String(data.amount)),
        attachment: imageUrl || null,
        projectId: data.projectId || null,
      };

      const response = await fetch("/api/requisitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create requisition");
      }

      toast.success("Requisition created successfully!");
      reset();
      setImageUrl("");
      router.push("/dashboard/projects/requisition");
    } catch (error: any) {
      toast.error(error.message || "Failed to create requisition");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create Requisition
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Name */}
            <TextInput
              errors={errors}
              label="Name"
              name="name"
              register={register}
              required
              className="w-full"
            />

            {/* Purpose */}
            <TextareaInput
              errors={errors}
              label="Purpose"
              name="purpose"
              register={register}
              className="w-full sm:col-span-2"
            />

            {/* Amount */}
            <TextInput
              errors={errors}
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              register={register}
              required
              className="w-full"
            />

            {/* Optional Project ID (if applicable) */}
            <TextInput
              errors={errors}
              label="Project ID (optional)"
              name="projectId"
              register={register}
              className="w-full"
            />

            {/* Attachment */}
            <ImageInput
              label="Attachment"
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            />
          </div>

          <SubmitButton isLoading={loading} title="Create Requisition" />
        </form>
      </div>
    </section>
  );
}

export default Form;
