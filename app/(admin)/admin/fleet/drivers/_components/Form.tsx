"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";

function Form() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue, // To update form values programmatically
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle the user selection and auto-populate the name field
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find((user) => user.id === selectedUserId);

    if (selectedUser) {
      setValue("name", selectedUser.name); // Auto-populate the name field
    }
  };

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const response = await fetch("/api/drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }), // Add userId to data
      });
      if (response.ok) {
        toast.success("Driver created successfully");
        reset();
        setLoading(false);
        router.push("/admin/fleet/drivers");
      } else {
        toast.error("Driver creation failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error creating driver");
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new Driver
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Add User Select */}
            <div className="sm:col-span-2">
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Assign User
              </label>
              <select
                {...register("userId", {
                  required: "User selection is required",
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleUserChange} // Handle change and auto-populate name
              >
                <option value="">Select a User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <p className="text-sm text-red-600 mt-1">
                  {"User selection is required"}
                </p>
              )}
            </div>
            <TextInput
              errors={errors}
              label={"Driver's name"}
              name={"name"}
              register={register}
            />
            <TextInput
              errors={errors}
              label={"License Number"}
              name={"licenseNumber"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Status"}
              name={"status"}
              register={register}
              className="w-full"
            />
          </div>
          <SubmitButton isLoading={loading} title="Create Driver" />
        </form>
      </div>
    </section>
  );
}

export default Form;
