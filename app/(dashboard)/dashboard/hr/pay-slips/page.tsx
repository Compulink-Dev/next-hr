import { getData } from "@/lib/apiResponse";
import FixedUserHeader from "@/app/(dashboard)/_components/fixedUserHeader";
import DataTable from "./_components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const dynamic = "force-dynamic";

async function PaySlip() {
  const slip = await getData("payslip");
  const session = await getServerSession(authOptions); // Use getServerSession to fetch session server-side

  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  // Filter payslip data based on user role
  const data = slip
    .filter((obj: any) => userRole === "admin" || obj.name === userName) // Only show user's own payslip if not admin
    .map((obj: any) => ({
      id: obj.id,
      name: obj.name,
      period: obj.period,
      attachment: obj.attachment || "No-file",
      createdAt: obj.createdAt,
    }));

  const columns = ["name", "period", "attachment", "createdAt"];

  return (
    <div>
      <FixedUserHeader link="/hr/pay-slips/new" title="Payslip" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="hr/pay-slips"
          resourceName="payslip"
        />
      </div>
    </div>
  );
}

export default PaySlip;
