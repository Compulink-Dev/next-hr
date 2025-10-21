// app/interview/panel/[id]/page.tsx
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { ReviewForm } from "../../_components/ReviewForm";

export default async function InterviewPanelPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please sign in to access this panel</div>;
  }

  try {
    const interview = await db.interview.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        Review: {
          include: {
            panelist: true,
          },
        },
      },
    });

    if (!interview) {
      return notFound();
    }

    // Verify the current user is a panelist
    const isPanelist = interview.assignedPanelists.includes(session.user.id);
    if (!isPanelist) {
      return <div>You are not authorized to access this panel</div>;
    }

    // Safely handle reviews - default to empty array if undefined
    const reviews = Array.isArray(interview.Review) ? interview.Review : [];
    const existingReview = reviews.find(
      (review: any) => review.panelistId === session.user.id
    );
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          Interview Panel: {interview.name}
        </h1>
        <div className="mt-4 space-y-4">
          <PanelSection title="Candidate Details">
            <p>Position: {interview.post || "Not specified"}</p>
            <p>Qualification: {interview.qualification || "Not specified"}</p>
          </PanelSection>

          {existingReview ? (
            <PanelSection title="Your Review">
              <p>Your Rating: {existingReview.rating}/5</p>
              <p>
                Your Comments:{" "}
                {existingReview.comment || "No comments provided"}
              </p>
            </PanelSection>
          ) : (
            <PanelSection title="Submit Your Review">
              <ReviewForm
                interviewId={interview.id}
                panelistId={session.user.id}
              />
            </PanelSection>
          )}

          {interview.Review.length > 0 && (
            <PanelSection title="Panel Reviews">
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review: any) => (
                    <div key={review.id} className="border-b pb-2">
                      <p>
                        <strong>
                          {review.panelist?.name || "Anonymous panelist"}
                        </strong>
                        :{review.rating}/5
                      </p>
                      {review.comment && (
                        <p className="text-sm mt-1">{review.comment}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No reviews submitted yet</p>
                )}
              </div>
            </PanelSection>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading interview:", error);
    return <div>Error loading interview details. Please try again later.</div>;
  }
}

function PanelSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </section>
  );
}
