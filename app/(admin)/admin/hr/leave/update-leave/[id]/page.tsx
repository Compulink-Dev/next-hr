import NewHeader from "@/app/(admin)/_components/newHeader";
import React from "react";
import { getData } from "@/lib/apiResponse";
import UpdateStatusForm from "../../_components/LeaveUpdate";

//@ts-ignore
async function UpdateLeave({ params: { id } }) {
  const data = await getData(`leave/${id}`);
  return (
    <div className="">
      <NewHeader title="Update Leave" link="hr/leave" />
      <div className="">
        <UpdateStatusForm initialData={data} />
      </div>
    </div>
  );
}

export default UpdateLeave;
