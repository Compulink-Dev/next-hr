'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'


function UpdateForm({ initialData }: any) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialData
    })

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch(`/api/customers/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Customer updated successfully')
                reset()
                router.push('/dashboard/sales/customers/')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Customer failed to update')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update a new Purchase Order</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Order name'}
                            name={'name'}
                            register={register}

                        />
                        <TextInput
                            errors={errors}
                            label={'Order quantity'}
                            name={'quantity'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Order unit'}
                            name={'unit'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Order price'}
                            name={'price'}
                            type='number'
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Order discount'}
                            name={'discount'}
                            type='number'
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Order vat'}
                            name={'vat'}
                            type='number'
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Order total'}
                            name={'total'}
                            type='number'
                            register={register}
                            className='w-full'
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Order description'}
                            name={'description'}
                            register={register}
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

export default UpdateForm