"use client";
import SelectInput from "@/app/(admin)/admin/inventory/_components/SelectInput";
import SubmitButton from "@/app/(dashboard)/dashboard/inventory/_components/SubmitButton";
import TextInput from "@/app/(dashboard)/dashboard/inventory/_components/TextInput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function RegistrationForm() {
  const router = useRouter();

  const selection = [
    {
      id: "user",
      name: "user",
    },
    {
      id: "admin",
      name: "admin",
    },
    {
      id: "hr",
      name: "hr",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [emailErr, setEmail] = useState("");
  console.log(emailErr);

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("User created");
        reset();
        router.push("/auth/login");
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmail("User with this email already exist");
          toast.error("User with this email already exist");
        } else {
          console.log("Server error:", responseData.message);
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Network error: ", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action={"#"}
      className="space-y-4 md:space-y-6"
    >
      <div className="">
        <TextInput
          errors={errors}
          label={"Enter your name"}
          name={"name"}
          register={register}
          type="text"
          className="w-full"
        />
        <TextInput
          errors={errors}
          label={"Enter your email"}
          name={"email"}
          register={register}
          type="email"
          className="w-full"
        />
        <TextInput
          errors={errors}
          label={"Enter your password"}
          name={"password"}
          register={register}
          type="password"
          className="w-full"
        />
        <SelectInput
          errors={errors}
          label={"Select role"}
          name={"role"}
          register={register}
          options={selection}
          className="text-black"
        />
      </div>
      <SubmitButton isLoading={loading} title="Register" />
      <div className="text-sm flex gap-1 items-center">
        <p className="">Already have an account</p>
        <div
          onClick={() => signIn()}
          className="text-blue-800 font-bold cursor-pointer"
        >
          Login ?
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
