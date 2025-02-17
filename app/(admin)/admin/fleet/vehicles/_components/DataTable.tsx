'use client'
import DeleteButton from '@/app/(dashboard)/dashboard/_components/Adjustment';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function DataTable({ data = [], columns = [], updateLink, resourceName }: any) {
    const { data: session } = useSession();
    const userRole = session?.user?.role;
    const userName = session?.user?.name;
    const [loading, setLoading] = useState(false)
    const router = useRouter();


    console.log("Vehicle Role : ", userRole);


    const handleApply = async (vehicleId: string, nweStatus: string) => {
        try {
            const res = await fetch(`/api/vehicles/${vehicleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: nweStatus })
            });
            if (res.ok) {
                router.refresh(); // Refresh the page to show updated status
            } else {
                const errorData = await res.json();
                console.error("Failed to apply for vehicle", errorData);
            }
        } catch (error) {
            console.error("Error in handleApply:", error);
        }
    };



    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {data.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((item: any, i: any) => (
                                <th key={i} scope="col" className="px-6 py-3">{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {columns.map((columnName: any, i: any) => (
                                    <td key={i} className="px-6 py-4 font-medium text-gray-900 dark:text-white">
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
                                            <Link href={`/admin/${updateLink}/update/${item.id}`} className="text-blue-600 hover:text-blue-400 flex items-center gap-1">
                                                <Edit />
                                                <span>Edit</span>
                                            </Link>
                                            <DeleteButton id={item.id} endpoint={resourceName} />
                                        </>
                                    ) : (
                                        item.status === "Available" && !data.some((v: any) => v.assignedUser === userName) ? (
                                            <button onClick={() => handleApply(item.id, 'In Transit')} className="text-blue-600 hover:text-blue-400">Apply</button>
                                        ) : item.status === "In Transit" && item.assignedUser === userName ? (
                                            <button onClick={() => handleApply(item.id, 'Available')} className="text-green-600 hover:text-green-400">Mark as Available</button>
                                        ) : null
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-sm text-center py-8">There is no data to display</div>
            )}
        </div>
    );
}

export default DataTable;
