// Your form component
"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function RequisitionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  // Fetch projects on component mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }
    fetchProjects();
  }, []);

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      console.log(data);
      const response = await fetch("/api/requisitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        toast.success("Requisition created successfully");
        reset();
        setLoading(false);
        router.push("/dashboard/projects/requisition");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Requisition failed to create");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Requisition failed to create");
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create New Requisition
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Requisition Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter requisition name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="purpose"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Purpose
              </label>
              <textarea
                id="purpose"
                rows={4}
                {...register("purpose", { required: "Purpose is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Describe the purpose of this requisition"
              />
              {errors.purpose && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.purpose.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                id="amount"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="projectId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Project (Optional)
              </label>
              <select
                id="projectId"
                {...register("projectId")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select a project</option>
                {projects.map((project: any) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="attachment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Attachment URL (Optional)
              </label>
              <input
                type="url"
                id="attachment"
                {...register("attachment")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="https://example.com/document.pdf"
              />
            </div>
          </div>

          {/* Move the button outside the grid and use proper shadcn Button styling */}
          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? "Creating..." : "Create Requisition"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RequisitionForm;
