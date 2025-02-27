"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import TextareaInput from "../../../inventory/_components/TextArea";

function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const currentDate = new Date();
      const sanitizedData = {
        ...data,
        mileage: parseInt(data.mileage, 10), // Convert mileage to number
        date: currentDate.toISOString().split("T")[0], // Get the date part (YYYY-MM-DD)
        time: currentDate.toISOString().split("T")[1].split(".")[0], // Get the time part (HH:MM:SS)
      };

      const response = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      console.log("Response:", sanitizedData);
      if (response.ok) {
        toast.success("Log entry created successfully");
        reset();
        router.push("/dashboard/fleet/logs");
      } else {
        toast.error("Failed to create log entry");
      }
    } catch (error) {
      toast.error("Error creating log entry");
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className=" mx-auto max-w-2xl ">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a New Log Entry
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* <TextInput
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
              register={register}
              className="w-full"
            /> */}
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
          <SubmitButton isLoading={loading} title="Create Log" />
        </form>
      </div>
    </section>
  );
}

export default Form;
