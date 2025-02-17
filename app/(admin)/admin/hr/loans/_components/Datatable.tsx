'use client'
import DeleteButton from '@/app/(dashboard)/dashboard/_components/Adjustment';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from 'next/link';
import React, { useState } from 'react';


interface Loan {
    id: number;
    type: string;
    amount: number;
    repayment: string;
    repayments: string;
    installment: string;
    interest: string;
    status: string;
}

function DataTable({ data = [], columns = [], updateLink, resourceName }: any) {
    const { data: session } = useSession();
    const userRole = session?.user?.role;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

    const handleDownloadClick = (loan: any) => {
        setSelectedLoan(loan);
        setIsOpen(true);
    };


    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {data.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((item: any, i: any) => (
                                <th key={i} scope="col" className="px-6 py-3">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {columns.map((columnName: any, i: any) => (
                                    <td key={i} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {columnName.includes('.') ? (
                                            columnName.split('.').reduce((obj: any, key: any) => obj[key], item)
                                        ) : columnName === 'imageUrl' ? (
                                            <img src={item.imageUrl} alt="" className="w-10 h-10 object-cover rounded-full" />
                                        ) : columnName === 'createdAt' || columnName === 'updatedAt' ? (
                                            new Date(item[columnName]).toLocaleDateString()
                                        ) : (
                                            item[columnName]
                                        )}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-right flex gap-2 items-center">
                                    {userRole === "admin" ? (
                                        <>
                                            <Link
                                                href={`/admin/${updateLink}/update/${item.id}`}
                                                className="text-blue-600 hover:text-blue-400 flex items-center gap-1"
                                            >
                                                <Edit />
                                                <span>Edit</span>
                                            </Link>
                                            <DeleteButton id={item.id} endpoint={resourceName} />
                                        </>
                                    ) : (
                                        item.attachment !== 'No-file' ? (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button onClick={() => handleDownloadClick(item)} className="text-blue-600 hover:text-blue-400">
                                                        View
                                                    </button>
                                                </DialogTrigger>
                                                {isOpen && selectedLoan && (
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Loan Details</DialogTitle>
                                                            <DialogDescription>View loan details below.</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">

                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="loan-type" className="text-right">
                                                                    Loan Type
                                                                </Label>
                                                                <Input id="loan-type" value={selectedLoan.type} className="col-span-3" disabled />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="loan-amount" className="text-right">
                                                                    Loan Amount
                                                                </Label>
                                                                <Input id="loan-amount" value={selectedLoan.amount} className="col-span-3" disabled />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="loan-repayment" className="text-right">
                                                                    Loan Repayment
                                                                </Label>
                                                                <Input id="loan-repayment" value={selectedLoan.repayment} className="col-span-3" disabled />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="loan-repayment" className="text-right">
                                                                    Loan Repayments
                                                                </Label>
                                                                <Input id="loan-repayment" value={selectedLoan.repayments} className="col-span-3" disabled />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="loan-interest" className="text-right">
                                                                    Loan Interest
                                                                </Label>
                                                                <Input id="loan-interest" value={selectedLoan.interest} className="col-span-3" disabled />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="loan-interest" className="text-right">
                                                                    Loan Installment
                                                                </Label>
                                                                <Input id="loan-interest" value={selectedLoan.installment} className="col-span-3" disabled />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="loan-status" className="text-right">
                                                                    Loan Status
                                                                </Label>
                                                                <Input id="loan-status" value={selectedLoan.status} className="col-span-3" disabled />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button onClick={() => setIsOpen(false)}>Close</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                )}
                                            </Dialog>
                                        ) : (
                                            <span>{item.attachment}</span>
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-sm text-center py-8">There is no data to display</div>
            )}
            {isOpen && selectedLoan && (
                <Dialog>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Loan Details</DialogTitle>
                            <DialogDescription>View loan details below.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="loan-id" className="text-right">
                                    Loan ID
                                </Label>
                                <Input id="loan-id" value={selectedLoan.id} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="loan-type" className="text-right">
                                    Loan Type
                                </Label>
                                <Input id="loan-type" value={selectedLoan.type} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="loan-amount" className="text-right">
                                    Loan Amount
                                </Label>
                                <Input id="loan-amount" value={selectedLoan.amount} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="loan-repayment" className="text-right">
                                    Loan Repayment
                                </Label>
                                <Input id="loan-repayment" value={selectedLoan.repayment} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="loan-interest" className="text-right">
                                    Loan Interest
                                </Label>
                                <Input id="loan-interest" value={selectedLoan.interest} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="loan-status" className="text-right">
                                    Loan Status
                                </Label>
                                <Input id="loan-status" value={selectedLoan.status} className="col-span-3" disabled />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setIsOpen(false)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

export default DataTable;
