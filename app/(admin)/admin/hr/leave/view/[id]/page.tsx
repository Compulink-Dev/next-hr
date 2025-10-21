export const dynamic = "force-dynamic";
import React from "react";
import ViewLeave from "../../_components/ViewLeaveForm";

function LeaveViewPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <ViewLeave id={params.id} />
    </div>
  );
}

export default LeaveViewPage;
