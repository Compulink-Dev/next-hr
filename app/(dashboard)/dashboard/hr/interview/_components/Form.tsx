"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TextInput from "../../../inventory/_components/TextInput";
import TextareaInput from "../../../inventory/_components/TextArea";
import SubmitButton from "../../../inventory/_components/SubmitButton";

type InterviewFormData = {
  name: string;
  post: string;
  qualification: string;
  training: string;
  experience: string;
  packages: string;
  rating: number;
  details: string;
  knowledge: string;
  attributes: string;
  comment: string;
};

function InterviewForm() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InterviewFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InterviewFormData) => {
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId,
          rating: Number(data.rating) || 1, // Ensure rating is always a number
        }),
      });

      if (response.ok) {
        toast.success("Interview assessment created successfully");
        reset();
        router.push("/dashboard/hr/interview");
      } else {
        throw new Error("Failed to create interview assessment");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create interview assessment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Interview Assessment Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              label="Candidate Name"
              name="name"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Post Applied For"
              name="post"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Qualification"
              name="qualification"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Training"
              name="training"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Experience"
              name="experience"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Salary Package"
              name="packages"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Rating (1-5)"
              name="rating"
              register={register}
              type="number"
              errors={errors}
            />
            <TextareaInput
              label="Additional Details"
              name="details"
              register={register}
              errors={errors}
            />
            <TextareaInput
              label="Knowledge & Skills"
              name="knowledge"
              register={register}
              errors={errors}
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
          <SubmitButton isLoading={loading} title="Submit Interview" />
        </form>
      </div>
    </section>
  );
}

export default InterviewForm;
