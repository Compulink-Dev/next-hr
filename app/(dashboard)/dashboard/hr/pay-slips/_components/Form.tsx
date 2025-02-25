"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import { useRouter } from "next/navigation";
import ImageInput from "@/app/(dashboard)/_components/UploadThing";
import { useSession } from "next-auth/react";

function Form() {
  const { data: session } = useSession();

  // const userName = session?.user?.name || 'name'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  // Fetch users from the backend
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/user"); // Adjust API endpoint as needed
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  async function onSubmit(data: any) {
    console.log("Submitted Data Before Assignment:", data); // Log raw data from the form

    if (!data.userId) {
      toast.error("Please select a user");
      return;
    }

    const selectedUser = users.find((user) => user.id === data.userId); // Find the selected user object

    if (!selectedUser) {
      toast.error("Selected user not found");
      return;
    }

    // Attach user name and attachment to the data object
    const updatedData = {
      ...data,
      name: selectedUser.name, // Assign the selected user's name
      attachment, // Add attachment to the payload
    };

    setLoading(true);
    try {
      console.log(data);
      const response = await fetch("/api/payslip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log(response);
        toast.success("Slip created successfully");
        reset();
        setLoading(false);
        router.push("/admin/hr/pay-slips");
      }
    } catch (error) {
      toast.error("Slip failed to create");
      console.log(error);
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
          <SubmitButton isLoading={loading} title="Payslip" />
        </form>
      </div>
    </section>
  );
}

export default Form;
