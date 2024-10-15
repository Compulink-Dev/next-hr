'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { makeApiRequest } from '@/lib/apiRequest'
import TextInput from '../../inventory/_components/TextInput'
import SubmitButton from '../../inventory/_components/SubmitButton'
import SelectInput from '../../inventory/_components/SelectInput'
import { useRouter } from 'next/navigation'


function Form({ categories }: any) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch('/api/integrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Integration created successfully')
                reset()
                router.push('/admin/integrations')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Integration failed to create')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Integrations</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Integration name'}
                            name={'name'}
                            register={register}
                        />
                        <TextInput
                            errors={errors}
                            label={'Integration subtitle'}
                            name={'subTitle'}
                            className='w-full'
                            register={register}
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the item category'}
                            name={'category'}
                            register={register}
                            className='w-full'
                            options={categories}
                        />
                        <TextInput
                            errors={errors}
                            label={'Integration attachment'}
                            name={'attachment'}
                            className='w-full'
                            register={register}
                        />
                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='Integration'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form