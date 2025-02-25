"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import TextareaInput from "../../../inventory/_components/TextArea";
import ImageInput from "@/app/(dashboard)/_components/UploadThing";

function UpdateForm({ initialData }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const [image, setImage] = useState("");
  const [attachment, setAttachment] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  async function onSubmit(data: any) {
    setLoading(true);
    try {
      console.log(data);
      const response = await fetch(`/api/training/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        toast.success("Customer updated successfully");
        reset();
        router.push("/admin/hr/training/");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Customer failed to update");
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update a new training
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* <TextInput
              errors={errors}
              label={"Customer name"}
              name={"name"}
              register={register}
              className="w-full"
            /> */}
            <TextInput
              errors={errors}
              label={"Start Date"}
              name={"startDate"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"End Date"}
              name={"endDate"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Training duration"}
              name={"duration"}
              register={register}
              className="w-full"
              type="number"
            />
            <TextInput
              errors={errors}
              label={"Training price"}
              name={"price"}
              register={register}
              className="w-full"
              type="number"
            />
            <TextInput
              errors={errors}
              label={"Training status"}
              name={"status"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Training modality"}
              name={"modality"}
              register={register}
              className="w-full"
            />
            <TextareaInput
              errors={errors}
              label={"Training description"}
              name={"description"}
              register={register}
            />
            <ImageInput
              label={"Image"}
              setImageUrl={setImage}
              imageUrl={image}
            />
            <ImageInput
              label={"Attachment"}
              setImageUrl={setAttachment}
              imageUrl={attachment}
            />
          </div>
          <SubmitButton isLoading={loading} title="changes" />
        </form>
      </div>
    </section>
  );
}

export default UpdateForm;
