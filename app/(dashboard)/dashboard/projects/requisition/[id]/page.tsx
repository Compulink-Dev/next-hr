export const dynamic = "force-dynamic";
import React from 'react';
import { getDataWithStatus } from '@/lib/apiResponse';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Forbidden from '@/components/Forbidden';
import Link from 'next/link';

export default async function RequisitionDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const { data, status } = await getDataWithStatus(`projects/requisitions/${params.id}`);

  if (status === 401 || status === 403) {
    return (
      <div className="p-6">
        <Forbidden message="You don’t have permission to view this requisition." />
      </div>
    );
  }

  if (status === 404 || !data) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-600">Requisition not found.</p>
        <div className="mt-4"><Link href="/dashboard/projects/requisition" className="text-blue-600 hover:underline">Back to list</Link></div>
      </div>
    );
  }

  const req = data;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Requisition: {req.name}</h1>
        <Link href="/dashboard/projects/requisition" className="text-sm text-blue-600 hover:underline">Back to list</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">Purpose</div>
          <div>{req.purpose}</div>
        </div>
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">Amount</div>
          <div>{req.amount}</div>
        </div>
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">Status</div>
          <div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${req.status === 'approved' ? 'bg-green-100 text-green-800' : req.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{req.status}</span>
          </div>
        </div>
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">Created</div>
          <div>{new Date(req.createdAt).toLocaleString()}</div>
        </div>
        {req.attachment ? (
          <div className="rounded border p-4">
            <div className="text-sm text-slate-500">Attachment</div>
            <a href={req.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open attachment</a>
          </div>
        ) : null}
      </div>
      {role === 'admin' && req.status === 'pending' ? (
        <div className="flex items-center gap-3">
          <form action={`/api/projects/requisitions/${params.id}/status`} method="post" className="inline" suppressHydrationWarning>
            {/* In server components, prefer client action via fetch. As a simple fallback, use buttons in list view. */}
          </form>
          <div className="text-sm text-slate-500">Use the Approve/Reject actions from the list to update status.</div>
        </div>
      ) : null}
    </div>
  );
}