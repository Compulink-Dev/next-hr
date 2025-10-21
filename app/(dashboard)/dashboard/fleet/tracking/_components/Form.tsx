'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { makeApiRequest } from '@/lib/apiRequest'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'
import { useRouter } from 'next/navigation'
import SelectInput from '../../../inventory/_components/SelectInput'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'


function Form() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    async function onSubmit(data: any) {
        setLoading(true)
        try {
            const payload = {
                vehicleId: data.vehicleId,
                latitude: parseFloat(data.latitude),
                longitude: parseFloat(data.longitude)
            }
            const response = await fetch('/api/tracking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Tracking point recorded')
                reset()
                setLoading(false)
                router.push('/dashboard/fleet/tracking')
            }
        } catch (error) {
            toast.error('Invoice failed to create')
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add tracking</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <SelectInput
                            errors={errors}
                            label={'Vehicle'}
                            name={'vehicleId'}
                            register={register}
                            className='w-full'
                            options={[]}
                        />
                        <TextInput
                            errors={errors}
                            label={'Latitude'}
                            name={'latitude'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Longitude'}
                            name={'longitude'}
                            register={register}
                            type='number'
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
                        title='Tracking'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form