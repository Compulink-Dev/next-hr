import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import DataTable from "./_components/DataTable";
import FixedUserHeader from "@/app/(admin)/_components/fixedUserHeader";

interface Vehicle {
  id: string;
  name: string;
  assignedUser: string;
  numberPlate: string;
  serviceDate: string;
  nextService: string;
  radioLicense: string;
  vehicleLicense: string;
  mileage: number;
  status: string;
  createdAt: string;
}

interface StatusCount {
  available: number;
  inTransit: number;
  offDuty: number;
}

async function Vehicle() {
  let vehicle: any[] = [];
  let session = null;

  try {
    [vehicle, session] = await Promise.all([
      getData("vehicles"),
      getServerSession(authOptions),
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    // You might want to show an error state here
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-red-800">
            Error Loading Vehicles
          </h2>
          <p className="text-red-600">
            Unable to load vehicle data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  // Transform data with proper error handling
  const data: Vehicle[] = Array.isArray(vehicle)
    ? vehicle.map((obj: any) => ({
        id: obj.id || "",
        name: obj.name || "Unnamed Vehicle",
        assignedUser: obj.assignedUser || "Unassigned",
        numberPlate: obj.numberPlate || "N/A",
        serviceDate: obj.serviceDate || "Not set",
        nextService: obj.nextService || "Not set",
        radioLicense: obj.radioLicense || "N/A",
        vehicleLicense: obj.vehicleLicense || "N/A",
        mileage: parseInt(obj.mileage) || 0,
        status: obj.status || "Not Available",
        createdAt: obj.createdAt || new Date().toISOString(),
      }))
    : [];

  // Count statuses with type safety
  const statusCounts: StatusCount = {
    available: data.filter((v) => v.status === "Available").length,
    inTransit: data.filter((v) => v.status === "In Transit").length,
    offDuty: data.filter((v) => v.status === "Off Duty").length,
  };

  const totalVehicles = data.length;

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
    <div className="min-h-screen bg-gray-50">
      {userRole === "admin" ? (
        <FixedHeader link="/fleet/vehicles/new" title="Vehicles" />
      ) : (
        <FixedUserHeader link="admin/fleet/vehicles/new" title="Vehicles" />
      )}

      {/* Stats Overview */}
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Fleet Overview
          </h2>
          <p className="text-gray-600">Total vehicles: {totalVehicles}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚗</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Available
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {statusCounts.available}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {totalVehicles > 0
                ? Math.round((statusCounts.available / totalVehicles) * 100)
                : 0}
              % of fleet
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚛</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              In Transit
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {statusCounts.inTransit}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {totalVehicles > 0
                ? Math.round((statusCounts.inTransit / totalVehicles) * 100)
                : 0}
              % of fleet
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Off Duty
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {statusCounts.offDuty}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {totalVehicles > 0
                ? Math.round((statusCounts.offDuty / totalVehicles) * 100)
                : 0}
              % of fleet
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total</h3>
            <p className="text-3xl font-bold text-gray-600">{totalVehicles}</p>
            <p className="text-sm text-gray-500 mt-1">Vehicles in fleet</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border p-4 border-gray-200">
          <DataTable
            data={data}
            columns={columns}
            updateLink="fleet/vehicles"
            resourceName="vehicles"
            filter="status"
          />
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
