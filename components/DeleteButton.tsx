"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  buttonText?: string;
  icon?: React.ReactNode;
  successMessage?: string;
  errorMessage?: string;
}

function DeleteButton({
  id,
  endpoint,
  buttonText = "Delete",
  successMessage = "Delete was successful",
  errorMessage = "Delete was not successful",
}: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/${endpoint}/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            router.refresh();
            setLoading(false);
            toast.success(successMessage);
            Swal.fire({
              title: "Deleted!",
              text: successMessage,
              icon: "success",
            });
          } else {
            setLoading(false);
            toast.error(errorMessage);
          }
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(errorMessage);
    }
  }

  return (
    <div>
      {loading ? (
        <button
          disabled
          type="button"
          className="py-2.5 px-5 me-2 text-sm font-medium text-red-900 bg-white rounded-lg border border-stone-200 hover:bg-stone-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-red-700 focus:text-red-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-red-200 animate-spin dark:text-stone-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#d33"
            />
          </svg>
          Loading...
        </button>
      ) : (
        <Button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-400 space-x-2"
          variant="ghost"
        >
          <Trash size={14} />
          <span>{buttonText}</span>
        </Button>
      )}
    </div>
  );
}

export default DeleteButton;
