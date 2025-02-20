"use client";
// app/hr-loans/page.tsx
import { useState } from "react";

// Mock data (replace with actual data from your API or database)
const loans = [
  {
    id: 1,
    applicant: "John Doe",
    amount: 5000,
    status: "Pending",
    reason: "",
    date: "2024-10-01",
  },
  {
    id: 2,
    applicant: "Jane Smith",
    amount: 3000,
    status: "Pending",
    reason: "",
    date: "2024-10-02",
  },
  {
    id: 3,
    applicant: "Mike Ross",
    amount: 7000,
    status: "Pending",
    reason: "",
    date: "2024-09-28",
  },
];

const HrLoanPage = () => {
  const [loanData, setLoanData] = useState(loans); // You can replace this with an API call
  const [updatedLoans, setUpdatedLoans] = useState([]);

  const handleStatusChange = (id: number, status: string) => {
    setLoanData((prevLoans) =>
      prevLoans.map((loan) => (loan.id === id ? { ...loan, status } : loan))
    );
  };

  const handleReasonChange = (id: number, reason: string) => {
    setLoanData((prevLoans) =>
      prevLoans.map((loan) => (loan.id === id ? { ...loan, reason } : loan))
    );
  };

  const handleSubmit = async () => {
    try {
      // Submit the updated loan data to an API
      const response = await fetch("/api/update-loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedLoans: loanData }),
      });

      if (response.ok) {
        alert("Loan statuses updated successfully!");
      } else {
        alert("Failed to update loans");
      }
    } catch (error) {
      console.error("Error updating loans:", error);
      alert("Error updating loans");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">HR Loan Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Applicant</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanData.map((loan) => (
              <tr key={loan.id}>
                <td className="px-4 py-2 border">{loan.applicant}</td>
                <td className="px-4 py-2 border">${loan.amount}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={loan.status}
                    onChange={(e) =>
                      handleStatusChange(loan.id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={loan.reason}
                    onChange={(e) =>
                      handleReasonChange(loan.id, e.target.value)
                    }
                    placeholder="Enter reason"
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2 border">{loan.date}</td>
                <td className="px-4 py-2 border">
                  {/* Optional Action buttons */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Loans
        </button>
      </div>
    </div>
  );
};

export default HrLoanPage;
