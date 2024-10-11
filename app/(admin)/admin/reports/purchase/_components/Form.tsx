'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { makeApiRequest } from '@/lib/apiRequest'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'
import { useRouter } from 'next/navigation'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'


function Form() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [image, setImage] = useState('')
    const [attachment, setAttachment] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch('/api/reports/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Purchase created successfully')
                reset()
                setLoading(false)
                router.push('/dashboard/reports/purchase')
            }
        } catch (error) {
            toast.error('Purchase failed to create')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Purchase</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Client name'}
                            name={'customer'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Sales name'}
                            name={'name'}
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
                            className='w-full'
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
                        title='Certificate'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form