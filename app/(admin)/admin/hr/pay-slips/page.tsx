export const dynamic = "force-dynamic";
import { getData } from "@/lib/apiResponse";
import { getServerSession } from "next-auth";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import { authOptions } from "@/lib/authOptions";
import DataTable from "@/app/(admin)/_components/DataTable";

async function PaySlip() {
  const slip = await getData("payslip");
  const session = await getServerSession(authOptions); // Use getServerSession to fetch session server-side

  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  const data = Array.isArray(slip)
    ? slip
        .filter(
          (obj: any) =>
            userRole === "admin" || userRole === "hr" || obj.name === userName
        )
        .map((obj: any) => ({
          id: obj.id,
          name: obj.name,
          period: obj.period,
          attachment: obj.attachment || "No-file",
          createdAt: obj.createdAt,
        }))
    : [];

  console.log("Payslip", data);

  return (
    <div>
      <FixedHeader link="/hr/pay-slips/new" title="Payslip" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={["name", "period", "attachment", "createdAt"]}
          updateLink="hr/pay-slips"
          resourceName="payslip"
          filter="name"
        />
      </div>
    </div>
  );
}

export default PaySlip;
