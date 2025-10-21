export const dynamic = "force-dynamic";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedUserHeader from "@/app/(dashboard)/_components/fixedUserHeader";
import DataTable from "./_components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Forbidden from "@/components/Forbidden";

async function PaySlip() {
  const { data: slip, status } = await getDataWithStatus("payslip");
  const safeSlip = Array.isArray(slip) ? slip : [];
  console.log("Payslip data:", slip);

  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  const data = safeSlip
    ? safeSlip
        .filter(
          (obj: any) =>
            userRole === "hr" || userRole === "admin" || obj.name === userName
        )
        .map((obj: any) => ({
          id: obj.id,
          name: obj.name,
          period: obj.period,
          attachment: obj.attachment || "No-file",
          createdAt: obj.createdAt,
        }))
    : [];

  if (status === 401 || status === 403) {
    return (
      <div className="p-6">
        <Forbidden message="You don’t have permission to view Payslips." />
      </div>
    );
  }

  return (
    <div>
      <FixedUserHeader link="hr/pay-slips/new" title="Payslip" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={["name", "period", "attachment", "createdAt"]}
          updateLink="hr/pay-slips"
          resourceName="payslip"
          filter={"period"}
        />
      </div>
    </div>
  );
}

export default PaySlip;
