// Update your Form component
export const dynamic = "force-dynamic";
import React from "react";
import CreateForm from "./CreateForm";
import { getData } from "@/lib/apiResponse";

async function Form() {
  try {
    // Fetch all data in parallel with error handling
    const [category, unit, brand, warehouse, supplier] = await Promise.all([
      getData("categories").catch(() => []),
      getData("units").catch(() => []),
      getData("brands").catch(() => []),
      getData("warehouse").catch(() => []),
      getData("suppliers").catch(() => []), // This will return empty array if suppliers API fails
    ]);

    console.log("Loaded data:", {
      categories: category?.length,
      units: unit?.length,
      brands: brand?.length,
      warehouses: warehouse?.length,
      suppliers: supplier?.length,
    });

    return (
      <div className="">
        <CreateForm
          category={category || []}
          unit={unit || []}
          supplier={supplier || []}
          brand={brand || []}
          warehouse={warehouse || []}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in Form component:", error);
    return (
      <div className="p-6">
        <div className="text-red-600">
          Error loading form data. Please try again later.
        </div>
      </div>
    );
  }
}

export default Form;
