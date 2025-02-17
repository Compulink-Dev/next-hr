'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'
import { DollarSign } from 'lucide-react'
import SelectInput from '../../../inventory/_components/SelectInput'


function UpdateLoanStatus({ initialData }: any) {

    const selection = [
        {
            id: 'Rejected',
            name: 'Rejected'
        },
        {
            id: 'Approved',
            name: 'Approved'
        }, {
            id: 'Pending',
            name: 'Pending'
        },
    ]

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialData
    })

    const router = useRouter()


    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch(`/api/loan/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Loan updated successfully')
                reset()
                router.push('/admin/hr/loans/')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Loan failed to update')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update a new Loan</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 space-y-8 items-center">
                        {/* <p className="">{response.name}</p> */}


                        <p className="text-gray-700 dark:text-gray-300">{`Payment: ${initialData.payment}`}</p>

                        <p className="text-gray-700 dark:text-gray-300">{`Loan Type: ${initialData.type}`}</p>





                        <p className="text-gray-700 dark:text-gray-300">{`Amount: ${initialData.amount}`}</p>


                        <p className="text-gray-700 dark:text-gray-300">{`Loan Repayment: ${initialData.repayment}`}</p>



                        <p className="text-gray-700 dark:text-gray-300">{`Loan Repayments: ${initialData.repayments}`}</p>


                        <p className="text-gray-700 dark:text-gray-300">{`Reason: ${initialData.reason}`}</p>
                        <SelectInput
                            errors={errors}
                            label={'Select status'}
                            name={'status'}
                            register={register}
                            options={selection}
                            className='text-black'
                        />
                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='changes'
                    />
                </form>
            </div>
        </section>
    )
}

export default UpdateLoanStatus