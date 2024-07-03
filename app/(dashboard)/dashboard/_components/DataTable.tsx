import { Button } from '@/components/ui/button'
import { getData } from '@/lib/apiResponse'
import { Delete, Edit, Trash } from 'lucide-react'
import React from 'react'


function DataTable({ data, columns }: any) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            columns.map((item: any, i: any) => (
                                <th
                                    key={i}
                                    scope="col" className="px-6 py-3">
                                    {item}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item: any) => (
                            <tr
                                key={item.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {
                                    columns.map((columnName: any, i: any) => (
                                        <td
                                            key={i}
                                            scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item[columnName]}
                                        </td>
                                    ))
                                }

                                <td className="px-6 py-4 text-right flex gap-2 items-center">
                                    <Button
                                        className='text-blue-600 hover:text-blue-400 flex items-center gap-1'
                                        variant={'ghost'}>
                                        <Edit />
                                        <span className="">Edit</span>
                                    </Button>
                                    <Button
                                        className='text-red-600 hover:text-red-400 space-x-2s'
                                        variant={'ghost'}>
                                        <Trash />
                                        <span className="">Delete</span>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}

export default DataTable