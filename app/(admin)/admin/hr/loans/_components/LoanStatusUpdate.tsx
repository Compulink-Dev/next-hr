'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function LoanStatusForm({ id, initialStatus }: any) {
    const { register, handleSubmit } = useForm({
        defaultValues: { status: initialStatus }
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/loan/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: data.status }),
            })
            if (response.ok) {
                toast.success('Loan status updated successfully')
                router.refresh()  // Refresh page after update
            } else {
                toast.error('Failed to update status')
            }
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Error updating status')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
            <select {...register('status')} className="border rounded p-1">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button type="submit" disabled={loading} className="p-2 bg-blue-600 text-white rounded">
                {loading ? 'Updating...' : 'Update'}
            </button>
        </form>
    )
}

export default LoanStatusForm
