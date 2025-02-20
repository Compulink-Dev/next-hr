'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Edit } from 'lucide-react'

function UserDataTable({ data = [], columns = [] }: any) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {
                data.length > 0 ? (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {
                                    columns.map((item: any, i: any) => (
                                        <th key={i} scope="col" className="px-6 py-3">
                                            {item}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item: any) => (
                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        {
                                            columns.map((columnName: any, i: any) => (
                                                <td key={i} className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    {columnName === 'createdAt' || columnName === 'updatedAt' ? new Date(item[columnName]).toLocaleDateString() : item[columnName]}
                                                </td>
                                            ))
                                        }
                                        <td>
                                            <Link
                                                href={`/admin/hr/loans/update/${item.id}`}
                                                className='text-blue-600 hover:text-blue-400 flex items-center gap-1'
                                            >
                                                <Edit />
                                                <span className="">Edit</span>
                                                {/* <p className="bg-red-800 h-8 w-24 text-white">{item.id}</p> */}
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-8">There is no data to display</div>
                )
            }
        </div>
    )
}

export default UserDataTable
