'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'


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


    const [image, setImage] = useState('')
    const [attachment, setAttachment] = useState('')
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch(`/api/reports/sales/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Sales Report updated successfully')
                reset()
                router.push('/dashboard/reports/sales/')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Sales Report failed to update')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update a new Sales Report</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Sales name'}
                            name={'name'}
                            register={register}
                        />
                        <TextInput
                            errors={errors}
                            label={'Client name'}
                            name={'clientName'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Date'}
                            name={'date'}
                            register={register}
                            className='w-full'
                            type='date'
                        />
                        <TextInput
                            errors={errors}
                            label={'Quantity'}
                            name={'quantity'}
                            register={register}
                            className='w-full'
                            type='number'
                        />
                        <TextInput
                            errors={errors}
                            label={'Price'}
                            name={'price'}
                            register={register}
                            className='w-full'
                            type='number'
                        />
                        <TextInput
                            errors={errors}
                            label={'Technician'}
                            name={'technician'}
                            register={register}
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Status'}
                            name={'status'}
                            register={register}
                        />
                        <ImageInput
                            label={'Attachment'}
                            setImageUrl={setAttachment}
                            imageUrl={attachment}
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