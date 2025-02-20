export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import DataTable from "./_components/DataTable";
import FixedUserHeader from "@/app/(admin)/_components/fixedUserHeader";

async function Vehicle() {
  const vehicle = await getData("vehicles");
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  const data = vehicle.map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      assignedUser: obj.assignedUser,
      numberPlate: obj.numberPlate,
      serviceDate: obj.serviceDate,
      nextService: obj.nextService,
      radioLicense: obj.radioLicense,
      vehicleLicense: obj.vehicleLicense,
      mileage: parseInt(obj.mileage),
      status: obj.status || "No-available",
      createdAt: obj.createdAt,
      transitStart: obj.transitStart,
      transitEnd: obj.transitEnd,
      transitDuration: obj.transitDuration,
    };
  });

  const countLoansByStatus = (status: string) =>
    data?.filter((loan: any) => loan.status === status).length;

  const columns = [
    "name",
    "assignedUser",
    "numberPlate",
    "serviceDate",
    "nextService",
    "radioLicense",
    "vehicleLicense",
    "mileage",
    "status",
    "createdAt",
  ];

  return (
    <div>
      {userRole === "admin" ? (
        <FixedHeader link={"/fleet/vehicles/new"} title="Vehicle" />
      ) : (
        <FixedUserHeader link={"admin/fleet/vehicles/new"} title="Vehicle" />
      )}

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4">
        <div className="p-4 bg-green-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Available</h2>
          <p className="text-2xl">{countLoansByStatus("Available")}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">In Transit</h2>
          <p className="text-2xl">{countLoansByStatus("In Transit")}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Off Duty</h2>
          <p className="text-2xl">{countLoansByStatus("Off Duty")}</p>
        </div>
      </div>

      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="fleet/vehicles"
          resourceName="vehicles"
        />
      </div>
    </div>
  );
}

export default Vehicle;
