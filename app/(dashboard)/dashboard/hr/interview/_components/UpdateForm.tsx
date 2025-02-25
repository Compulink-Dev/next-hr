"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import TextareaInput from "../../../inventory/_components/TextArea";

function UpdateInterviewForm({ initialData }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      post: initialData?.post || "",
      qualification: initialData?.qualification || "",
      training: initialData?.training || "",
      experience: initialData?.experience || "",
      details: initialData?.details || "",
      knowledge: initialData?.knowledge || "",
      attributes: initialData?.attributes || "",
      packages: initialData?.packages || "",
      rating: initialData?.rating || 0,
      comment: initialData?.comment || "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const response = await fetch(`/api/interviews/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating: Number(data.rating) }),
      });

      if (response.ok) {
        toast.success("Interview updated successfully");
        setLoading(false);
        reset();
        router.push("/dashboard/hr/interview/");
      } else {
        throw new Error("Failed to update interview");
      }
    } catch (error) {
      toast.error("Failed to update interview");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Interview
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              label="Candidate Name"
              name="name"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Position"
              name="post"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Qualification"
              name="qualification"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Training"
              name="training"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Experience"
              name="experience"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Knowledge"
              name="knowledge"
              register={register}
              errors={errors}
              className="w-full"
            />

            <TextInput
              label="Packages"
              name="packages"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Rating"
              name="rating"
              register={register}
              errors={errors}
              type="number"
              className="w-full"
            />
            <TextareaInput
              label="Attributes"
              name="attributes"
              register={register}
              errors={errors}
            />
            <TextareaInput
              label="Comment"
              name="comment"
              register={register}
              errors={errors}
            />
          </div>
          <SubmitButton isLoading={loading} title="Update Interview" />
        </form>
      </div>
    </section>
  );
}

export default UpdateInterviewForm;
