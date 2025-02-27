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

  const data = Array.isArray(vehicle)
    ? vehicle.map((obj: any) => ({
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
      }))
    : [];

  const countStatus = (status: string) =>
    data.filter((v) => v.status === status).length;

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
        <FixedHeader link={"/fleet/vehicles/new"} title="Vehicles" />
      ) : (
        <FixedUserHeader link={"admin/fleet/vehicles/new"} title="Vehicles" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4">
        <div className="p-4 bg-green-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Available</h2>
          <p className="text-2xl">{countStatus("Available")}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">In Transit</h2>
          <p className="text-2xl">{countStatus("In Transit")}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Off Duty</h2>
          <p className="text-2xl">{countStatus("Off Duty")}</p>
        </div>
      </div>

      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="fleet/vehicles"
          resourceName="vehicles"
          filter="status"
        />
      </div>
    </div>
  );
}

export default Vehicle;
