"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import TextareaInput from "../../../inventory/_components/TextArea";

function UpdateForm({ initialData }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const response = await fetch(`/api/logs/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Log entry updated successfully");
        reset();
        router.push("/dashboard/logs");
      } else {
        toast.error("Failed to update log entry");
      }
    } catch (error) {
      toast.error("Error updating log entry");
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Log Entry
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              errors={errors}
              label="Date"
              name="date"
              type="date"
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label="Time"
              name="time"
              type="time"
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label="Mileage"
              name="mileage"
              type="number"
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label="Remarks"
              name="remarks"
              register={register}
              className="w-full"
            />
            <TextareaInput
              errors={errors}
              label="Details"
              name="details"
              register={register}
            />
          </div>
          <SubmitButton isLoading={loading} title="Save Changes" />
        </form>
      </div>
    </section>
  );
}

export default UpdateForm;
