'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { makeApiRequest } from '@/lib/apiRequest'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'
import { useRouter } from 'next/navigation'


function Form() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [loading, setLoading] = useState(false)
    const router = useRouter()


    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Employee created successfully')
                reset()
                setLoading(false)
                router.push('/dashboard/hr/employees')
            }
        } catch (error) {
            toast.error('Employee failed to create')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Employee</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Employee name'}
                            name={'name'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Employee email'}
                            name={'email'}
                            register={register}
                            className='w-full'
                            type='email'
                        />
                        <TextInput
                            errors={errors}
                            label={'Employee phone'}
                            name={'phone'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Employee address'}
                            name={'address'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Employee title'}
                            name={'title'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Employee appliedDate'}
                            name={'appliedDate'}
                            register={register}
                            className='w-full'
                            type='date'
                        />
                        <TextInput
                            errors={errors}
                            label={'Employee status'}
                            name={'status'}
                            register={register}
                        />
                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='Employee'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form