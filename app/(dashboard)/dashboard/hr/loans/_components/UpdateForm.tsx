"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextInput from "../../../inventory/_components/TextInput";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import TextareaInput from "../../../inventory/_components/TextArea";
import ImageInput from "@/app/(dashboard)/_components/UploadThing";
import SelectInput from "../../../inventory/_components/SelectInput";

function UpdateForm({ initialData }: any) {
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
  const [isOpen, setIsOpen] = useState(false);
  async function onSubmit(data: any) {
    setLoading(true);
    try {
      console.log(data);
      const response = await fetch(`/api/loans/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        setLoading(false);
        setIsOpen(true);
        router.refresh();
      } else {
        toast.error("Loan failed to update");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Loan failed to update");
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update a new Loan
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              errors={errors}
              label={"Payment"}
              name={"payment"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Loan type"}
              name={"type"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Amount"}
              name={"amount"}
              register={register}
              className="w-full"
              type="number"
            />
            <TextInput
              errors={errors}
              label={"Loan repayment"}
              name={"repayment"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Loan repayments"}
              name={"repayments"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Reason"}
              name={"reason"}
              register={register}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Loan interest"}
              name={"interest"}
              register={register}
              className="w-full"
            />
            <SelectInput
              errors={errors}
              label={"Loan status"}
              name={"status"}
              register={register}
              className="w-full"
              options={[
                { id: "Approved", name: "Approved" },
                { id: "Pending", name: "Pending" },
                { id: "Rejected", name: "Rejected" },
              ]}
            />
            <TextInput
              errors={errors}
              label={"Installments"}
              name={"installment"}
              register={register}
              type="number"
            />
            <ImageInput
              label={"Item image"}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            />
          </div>
          <SubmitButton isLoading={loading} title="changes" />
        </form>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Loan Updated Successfully
            </h2>
            <p className="mb-6">Do you want to proceed?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success("Loan updated successfully");
                  reset();
                  router.push("/admin/hr/loans/");
                  setIsOpen(false);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UpdateForm;
