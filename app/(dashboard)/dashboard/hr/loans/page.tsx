export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "./_components/Datatable";
import UserDataTable from "./_components/UserDataTable";
import Forbidden from "@/components/Forbidden";
async function Loans() {
  const session = await getServerSession(authOptions);

  const { data: loan, status } = await getDataWithStatus("loans");

  const userRole = session?.user?.role;
  const userID = session?.user?.id;

  console.log("Session : ", session);

  const response = Array.isArray(loan)
    ? loan
        .filter((obj: any) => {
          if (userRole === "hr") {
            return true; // admins can see all data
          } else {
            return obj.userId === userID; // non-admins can only see their own data
          }
        })
        .map((obj: any) => {
          return {
            id: obj.id,
            userId: obj.userId,
            payment: obj.payment,
            type: obj.type,
            amount: parseFloat(obj.amount),
            repayment: obj.repayment,
            repayments: parseInt(obj.repayments) || 0,
            reason: obj.reason,
            status: obj.status || "Pending",
            interest: parseFloat(obj.interest) || 0,
            installment: parseFloat(obj.installment) || 0,
            attachment: obj.attachment || "No file",
            createdAt: obj.createdAt,
          };
        })
    : [];

  const countLoansByStatus = (status: string) =>
    response?.filter((loan: any) => loan.status === status).length;

  const columns = [
    "payment",
    "type",
    "amount",
    "repayment",
    "repayments",
    "reason",
    "status",
    "interest",
    "installment",
    "attachment",
    "createdAt",
  ];

  if (status === 401 || status === 403) {
    return (
      <div className="p-6">
        <Forbidden message="You don’t have permission to view Loans." />
      </div>
    );
  }

  return (
    <div>
      <FixedHeader link={"/hr/loans/new"} title="Loan" />

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4">
        <div className="p-4 bg-green-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Approved</h2>
          <p className="text-2xl">{countLoansByStatus("Approved")}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Pending</h2>
          <p className="text-2xl">{countLoansByStatus("Pending")}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Rejected</h2>
          <p className="text-2xl">{countLoansByStatus("Rejected")}</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-4">
        {userRole === "hr" ? (
          <DataTable
            data={response}
            columns={columns}
            updateLink="hr/loans"
            resourceName="loans"
          />
        ) : (
          <UserDataTable
            data={response}
            columns={columns}
            updateLink="hr/loans"
            resourceName="loans"
          />
        )}
      </div>
    </div>
  );
}

export default Loans;
