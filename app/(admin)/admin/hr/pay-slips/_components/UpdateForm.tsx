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
    const [attachment, setAttachment] = useState('')

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
        data.attachment = attachment
        setLoading(true)
        try {
            console.log(data);

            const response = await fetch(`/api/payslip/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Payslip updated successfully')
                reset()
                router.push('/admin/hr/pay-slips/')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Payslip failed to update')
            console.log(error);
            setLoading(false)
        }
    }



    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update a new Payslip</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Payslip name'}
                            name={'name'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Period'}
                            name={'period'}
                            register={register}
                            className='w-full'
                            type='date'
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