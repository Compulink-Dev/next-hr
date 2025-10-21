// app/interview/panel/[id]/ReviewForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ReviewForm({
  interviewId,
  panelistId,
}: {
  interviewId: string;
  panelistId: string;
}) {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interviewId,
          panelistId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      router.refresh();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <Label>Rating</Label>
        <RadioGroup
          value={rating.toString()}
          onValueChange={(value) => setRating(Number(value))}
          className="flex gap-4 mt-2"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex items-center space-x-2">
              <RadioGroupItem value={num.toString()} id={`r${num}`} />
              <Label htmlFor={`r${num}`}>{num}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="comment">Comments</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-2"
          placeholder="Enter your evaluation comments..."
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="button">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
