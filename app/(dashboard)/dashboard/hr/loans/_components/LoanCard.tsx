'use client'
// app/loans/page.tsx
import { useEffect, useState } from 'react';

// Mock data (You will fetch this from your API)
const loans = [
    { id: 1, applicant: 'John Doe', amount: 5000, status: 'Approved', date: '2024-10-01' },
    { id: 2, applicant: 'Jane Smith', amount: 3000, status: 'Pending', date: '2024-10-02' },
    { id: 3, applicant: 'Mike Ross', amount: 7000, status: 'Rejected', date: '2024-09-28' },
];

const LoanPage = () => {
    const [loanData, setLoanData] = useState(loans); // You can replace this with an API call

    const countLoansByStatus = (status: string) =>
        loanData.filter((loan) => loan.status === status).length;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Loan Management</h1>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-100 rounded shadow-md text-center">
                    <h2 className="text-lg font-bold">Approved</h2>
                    <p className="text-2xl">{countLoansByStatus('Approved')}</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded shadow-md text-center">
                    <h2 className="text-lg font-bold">Pending</h2>
                    <p className="text-2xl">{countLoansByStatus('Pending')}</p>
                </div>
                <div className="p-4 bg-red-100 rounded shadow-md text-center">
                    <h2 className="text-lg font-bold">Rejected</h2>
                    <p className="text-2xl">{countLoansByStatus('Rejected')}</p>
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Applicant</th>
                            <th className="px-4 py-2 border">Amount</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanData.map((loan) => (
                            <tr key={loan.id}>
                                <td className="px-4 py-2 border">{loan.applicant}</td>
                                <td className="px-4 py-2 border">${loan.amount}</td>
                                <td className="px-4 py-2 border">{loan.status}</td>
                                <td className="px-4 py-2 border">{loan.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoanPage;
