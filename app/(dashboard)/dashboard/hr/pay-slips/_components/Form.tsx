"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import { useRouter } from "next/navigation";
import ImageInput from "@/app/(dashboard)/_components/UploadThing";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  role?: string;
}

function Form() {
  const { data: session } = useSession();

  console.log("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from the backend, excluding admin and HR roles
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const usersData: User[] = await response.json();

          console.log(usersData);

          // Filter out users with admin or HR roles
          const filteredUsers = usersData.filter(
            (user) => user.role !== "admin" && user.role !== "hr"
          );
          setUsers(filteredUsers);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      }
    }

    fetchUsers();
  }, []);

  async function onSubmit(data: any) {
    if (!data.userId) {
      toast.error("Please select a user");
      return;
    }

    const selectedUser = users.find((user) => user.id === data.userId);
    if (!selectedUser) {
      toast.error("Selected user not found");
      return;
    }

    const updatedData = {
      ...data,
      name: selectedUser.name,
      attachment,
    };

    setLoading(true);
    try {
      const response = await fetch("/api/payslip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        toast.success("Payslip created successfully");
        reset();
        router.push("/dashboard/hr/pay-slips");
      } else {
        toast.error("Failed to create payslip");
      }
    } catch (error) {
      toast.error("Payslip failed to create");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new Payslip
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label
                htmlFor="user"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select User
              </label>
              <select
                id="user"
                {...register("userId", { required: "Please select a user" })}
                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.userId && typeof errors.userId.message === "string" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.userId.message}
                </p>
              )}
            </div>
            <TextInput
              errors={errors}
              label={"Period"}
              name={"period"}
              register={register}
              className="w-full"
              type="date"
            />
            <ImageInput
              label={"Attachment"}
              setImageUrl={setAttachment}
              imageUrl={attachment}
            />
          </div>
          <SubmitButton isLoading={loading} title="Create Payslip" />
        </form>
      </div>
    </section>
  );
}

export default Form;
