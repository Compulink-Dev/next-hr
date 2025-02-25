export const dynamic = "force-dynamic";
import { getData } from "@/lib/apiResponse";
import FixedUserHeader from "@/app/(dashboard)/_components/fixedUserHeader";
import DataTable from "./_components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function PaySlip() {
  const slip = (await getData("payslip")) || []; // Ensure slip is always an array
  console.log("Payslip data:", slip);

  if (!Array.isArray(slip)) {
    return <div>Error loading payslips</div>;
  }

  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  const data = slip
    .filter((obj: any) => userRole === "admin" || obj.name === userName)
    .map((obj: any) => ({
      id: obj.id,
      name: obj.name,
      period: obj.period,
      attachment: obj.attachment || "No-file",
      createdAt: obj.createdAt,
    }));

  return (
    <div>
      <FixedUserHeader link="/hr/pay-slips/new" title="Payslip" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={["name", "period", "attachment", "createdAt"]}
          updateLink="hr/pay-slips"
          resourceName="payslip"
        />
      </div>
    </div>
  );
}

export default PaySlip;
