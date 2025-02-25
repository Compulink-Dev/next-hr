"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../inventory/_components/TextInput";
import SubmitButton from "../../inventory/_components/SubmitButton";

function DocumentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create document");
      }

      toast.success("Document created successfully");
      reset();
      router.push("/dashboard/documents"); // Redirect to document list
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Failed to create document");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a New Document
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              label="Document Name"
              name="name"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Document Subtitle"
              name="subtitle"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Document Category"
              name="category"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Document Attachment"
              name="attachment"
              register={register}
              errors={errors}
              className="w-full"
            />
          </div>
          <SubmitButton isLoading={loading} title="Submit Document" />
        </form>
      </div>
    </section>
  );
}

export default DocumentForm;
