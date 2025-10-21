"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TextInput from "../../../inventory/_components/TextInput";
import TextareaInput from "../../../inventory/_components/TextArea";
import SubmitButton from "../../../inventory/_components/SubmitButton";
import { Button } from "@/components/ui/button";

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
  const [users, setUsers] = useState<any[]>([]);
  const [selectedPanelists, setSelectedPanelists] = useState<string[]>([]);
  const [isPanelistDialogOpen, setIsPanelistDialogOpen] = useState(false);

  // Fetch users when dialog opens
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.filter((user: any) => user.id !== userId)); // Exclude current user
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const togglePanelist = (userId: string) => {
    setSelectedPanelists((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

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
          qualification: data.qualification || null, // Explicitly handle
          userId: userId,
          rating: Number(data.rating) || 1, // Ensure rating is always a number
          assignedPanelists: selectedPanelists, // Include panelists in submission
        }),
      });

      console.log("Received data:", data);

      const responseData = await response.json(); // Parse response

      if (!response.ok) {
        throw new Error(
          responseData.error || "Failed to create interview assessment"
        );
      }

      toast.success("Interview assessment created successfully");
      reset();
      setSelectedPanelists([]);
      router.push("/dashboard/hr/interview");
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
              isRequired={false}
            />
            <TextInput
              label="Training"
              name="training"
              register={register}
              errors={errors}
              isRequired={false}
            />
            <TextInput
              label="Experience"
              name="experience"
              register={register}
              errors={errors}
              isRequired={false}
            />
            <TextInput
              label="Salary Package"
              name="packages"
              register={register}
              errors={errors}
              isRequired={false}
            />
            <TextInput
              label="Rating (1-5)"
              name="rating"
              register={register}
              type="number"
              errors={errors}
              isRequired={false}
            />
            <TextareaInput
              label="Additional Details"
              name="details"
              register={register}
              errors={errors}
              isRequired={false}
            />
            <TextareaInput
              label="Knowledge & Skills"
              name="knowledge"
              register={register}
              errors={errors}
              isRequired={false}
            />
            <TextareaInput
              label="Attributes"
              name="attributes"
              register={register}
              errors={errors}
              isRequired={false}
            />
            <TextareaInput
              label="Comment"
              name="comment"
              register={register}
              errors={errors}
              isRequired={false}
            />
          </div>
          {/* Panelist Assignment Section */}
          <div className="mt-6 space-y-2">
            <Label>Panelists</Label>
            <div className="flex items-center gap-2">
              <Dialog
                open={isPanelistDialogOpen}
                onOpenChange={(open) => {
                  setIsPanelistDialogOpen(open);
                  if (open) fetchUsers();
                }}
              >
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    {selectedPanelists.length > 0
                      ? `${selectedPanelists.length} panelists selected`
                      : "Add Panelists"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Select Panelists</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded">
                      {users.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`panelist-${user.id}`}
                            checked={selectedPanelists.includes(user.id)}
                            onCheckedChange={() => togglePanelist(user.id)}
                          />
                          <label
                            htmlFor={`panelist-${user.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {user.name} ({user.email})
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="bg-blue-600 hover:bg-blue-800"
                        type="button"
                        onClick={() => setIsPanelistDialogOpen(false)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {selectedPanelists.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {selectedPanelists.length} selected
                </span>
              )}
            </div>
          </div>
          <SubmitButton isLoading={loading} title="Submit Interview" />
        </form>
      </div>
    </section>
  );
}

export default InterviewForm;
