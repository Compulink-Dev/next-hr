'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'
import TextInput from '../../inventory/_components/TextInput'
import SubmitButton from '../../inventory/_components/SubmitButton'


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

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch(`/api/fleetInvoice/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Invoice updated successfully')
                reset()
                router.push('/dashboard/fleet/invoices/')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Invoice failed to update')
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update a new Customer</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={"Driver's name"}
                            name={'name'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Location'}
                            name={'location'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Time'}
                            name={'time'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Payment Type'}
                            name={'paymentType'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Amount'}
                            name={'amount'}
                            type='number'
                            register={register}
                            className='w-full'
                        />
                        {/* <ImageInput
                            label={'Attachment'}
                            setImageUrl={setImageUrl}
                            imageUrl={imageUrl}
                        /> */}
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