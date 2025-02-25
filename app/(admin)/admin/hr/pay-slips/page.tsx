export const dynamic = "force-dynamic";
import { getData } from "@/lib/apiResponse";
import DataTable from "./_components/DataTable";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";

async function PaySlip() {
  const slip = await getData("payslip");
  const session = await getServerSession(authOptions); // Use getServerSession to fetch session server-side

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
        />
      </div>
    </div>
  );
}

export default PaySlip;
