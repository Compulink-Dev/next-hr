"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import TextareaInput from "../../../inventory/_components/TextArea";
import SelectInput from "../../../inventory/_components/SelectInput";
import ImageInput from "@/app/(dashboard)/_components/UploadThing";

function UpdateStatusForm({ initialData }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: any) {
    setLoading(true);
    try {
      console.log(data);
      const response = await fetch(`/api/leave/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        toast.success("Leave updated successfully");
        reset();
        router.push("/admin/hr/leave/");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Leave failed to update");
      console.log(error);
      setLoading(false);
    }
  }

  const type = [
    {
      name: "",
      value: "",
    },
    {
      name: "Sick",
      value: "sick",
    },
    {
      name: "Annual",
      value: "annual",
    },
    {
      name: "Maternity",
      value: "maternity",
    },
    {
      name: "Special",
      value: "special",
    },
    {
      name: "Unpaid",
      value: "unpaid",
    },
  ];

  const source = [
    {
      name: "",
      value: "",
    },
    {
      name: "Source",
      value: "source",
    },
    {
      name: "Banked",
      value: "banked",
    },
  ];

  const selection = [
    {
      id: "Rejected",
      name: "Rejected",
    },
    {
      id: "Approved",
      name: "Approved",
    },
    {
      id: "Pending",
      name: "Pending",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update a new Leave
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <p className="text-gray-700 dark:text-gray-300">{`Payment: ${initialData.type}`}</p>

            <p className="text-gray-700 dark:text-gray-300">{`Loan Type: ${initialData.source}`}</p>

            <p className="text-gray-700 dark:text-gray-300">{`Payment: ${initialData.from}`}</p>

            <p className="text-gray-700 dark:text-gray-300">{`Loan Type: ${initialData.to}`}</p>

            <p className="text-gray-700 dark:text-gray-300">{`Payment: ${initialData.duration}`}</p>

            <p className="text-gray-700 dark:text-gray-300">{`Loan Type: ${initialData.contact}`}</p>
            <p className="text-gray-700 dark:text-gray-300">{`Loan Type: ${initialData.reason}`}</p>
          </div>
          <SelectInput
            errors={errors}
            label={"Select status"}
            name={"status"}
            register={register}
            options={selection}
            className="text-black mt-2"
          />
          <SubmitButton isLoading={loading} title="changes" />
        </form>
      </div>
    </section>
  );
}

export default UpdateStatusForm;
