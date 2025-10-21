"use client";
import ImageInput from "@/app/(dashboard)/_components/UploadThing";
import React, { useState } from "react";
import SubmitButton from "../../_components/SubmitButton";
import TextareaInput from "../../_components/TextArea";
import TextInput from "../../_components/TextInput";
import SelectInput from "../../_components/SelectInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CreateForm({ brand, category, unit, warehouse, supplier }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Helper function to validate MongoDB ObjectID
  const isValidObjectId = (id: string): boolean => {
    //@ts-ignore
    return id && /^[0-9a-fA-F]{24}$/.test(id);
  };

  // In your CreateForm component, update the onSubmit function
  async function onSubmit(data: any) {
    data.imageUrl = imageUrl;
    setLoading(true);
    try {
      console.log("Form data before processing:", data);

      // Process the data - don't convert to null, let the API handle it
      const processedData = {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        sku: data.sku,
        barcode: data.barcode,
        quantity: data.quantity,
        unitId: data.unitId, // Send as-is, API will validate
        brandId: data.brandId, // Send as-is, API will validate
        sellingPrice: data.sellingPrice,
        buyingPrice: data.buyingPrice,
        supplierId: data.supplierId, // Send as-is, API will validate
        reOrderPoint: data.reOrderPoint,
        imageUrl: data.imageUrl,
        warehouseId: data.warehouseId,
        weight: data.weight,
        dimensions: data.dimensions,
        taxRate: data.taxRate,
        notes: data.notes,
      };

      console.log("Processed data:", processedData);

      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        toast.success("Item created successfully");
        reset();
        setImageUrl("");
        setLoading(false);
        router.push("/dashboard/inventory/items");
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        toast.error(errorData.error || "Failed to create item");
        setLoading(false);
      }
    } catch (error) {
      console.log("Network error:", error);
      setLoading(false);
      toast.error("Network error - failed to create item");
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new Item
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Required Fields */}
            <TextInput
              errors={errors}
              label={"Item name"}
              name={"name"}
              register={register}
              isRequired={true}
              className="w-full"
            />
            <SelectInput
              errors={errors}
              label={"Select the item category"}
              name={"categoryId"}
              register={register}
              isRequired={true}
              className="w-full"
              options={category}
            />
            <SelectInput
              errors={errors}
              label={"Select warehouse"}
              name={"warehouseId"}
              register={register}
              isRequired={true}
              className="w-full"
              options={warehouse}
            />

            {/* Optional Fields */}
            <TextInput
              errors={errors}
              label={"Item SKU"}
              name={"sku"}
              register={register}
              isRequired={false}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Item Barcode"}
              name={"barcode"}
              register={register}
              isRequired={false}
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Item quantity"}
              name={"quantity"}
              register={register}
              isRequired={true}
              type="number"
              className="w-full"
            />
            <SelectInput
              errors={errors}
              label={"Select item unit"}
              name={"unitId"}
              register={register}
              isRequired={false}
              className="w-full"
              options={unit}
            />
            <SelectInput
              errors={errors}
              label={"Select item brand"}
              name={"brandId"}
              register={register}
              isRequired={false}
              className="w-full"
              options={brand}
            />
            <TextInput
              errors={errors}
              label={"Buying price"}
              name={"buyingPrice"}
              register={register}
              isRequired={true}
              type="number"
              step="0.01"
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Selling price"}
              name={"sellingPrice"}
              register={register}
              isRequired={true}
              type="number"
              step="0.01"
              className="w-full"
            />
            <SelectInput
              errors={errors}
              label={"Select supplier"}
              name={"supplierId"}
              register={register}
              isRequired={false}
              className="w-full"
              options={supplier}
            />
            <TextInput
              errors={errors}
              label={"Re-Order Point"}
              name={"reOrderPoint"}
              register={register}
              isRequired={true}
              type="number"
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Weight (kg)"}
              name={"weight"}
              register={register}
              isRequired={false}
              type="number"
              step="0.01"
              className="w-full"
            />
            <TextInput
              errors={errors}
              label={"Item Dimensions (L x W x H in cm)"}
              name={"dimensions"}
              register={register}
              isRequired={false}
              className="w-full"
              placeholder="20 x 30 x 100"
            />
            <TextInput
              errors={errors}
              label={"Item Tax Rate (%)"}
              name={"taxRate"}
              register={register}
              isRequired={false}
              type="number"
              step="0.01"
              className="w-full"
            />
            <div className="sm:col-span-2">
              <TextareaInput
                errors={errors}
                label={"Item description"}
                name={"description"}
                register={register}
                isRequired={false}
              />
            </div>
            <div className="sm:col-span-2">
              <TextareaInput
                errors={errors}
                label={"Item notes"}
                name={"notes"}
                register={register}
                isRequired={false}
              />
            </div>
          </div>

          <div className="mt-6">
            <ImageInput
              label={"Item image"}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            />
          </div>

          <div className="mt-6">
            <SubmitButton isLoading={loading} title="Item" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateForm;
