// app/(dashboard)/hr/interview/access/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function InterviewAccessPage() {
  const { data: session } = useSession();
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/interviews/access", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Access code generated");
        fetchCodes();
      } else {
        throw new Error(data.error || "Failed to generate code");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCodes = async () => {
    try {
      const response = await fetch("/api/interviews/access");
      const data = await response.json();
      if (response.ok) {
        setCodes(data);
      }
    } catch (error) {
      console.error("Failed to fetch codes", error);
    }
  };

  useEffect(() => {
    if (session?.user?.role === "hr") {
      fetchCodes();
    }
  }, [session]);

  if (session?.user?.role !== "hr") {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Access Codes</h1>
      <button
        onClick={generateCode}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate New Code"}
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Expires At</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code.id}>
                <td className="py-2 px-4 border-b">{code.code}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(code.expiresAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {code.used
                    ? "Used"
                    : new Date() > new Date(code.expiresAt)
                    ? "Expired"
                    : "Active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
