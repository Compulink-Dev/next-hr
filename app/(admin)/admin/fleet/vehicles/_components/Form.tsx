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
            console.log(data);
            const response = await fetch('/api/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Vehicle created successfully')
                reset()
                setLoading(false)
                router.push('/dashboard/fleet/vehicles')
            }
        } catch (error) {
            toast.error('Vehicle failed to create')
            console.log(error);
            setLoading(false)
        }
    }

    const type = [
        {
            name: "",
            value: ""
        },
        {
            name: "Sick",
            value: "sick"
        },
        {
            name: "Annual",
            value: "annual"
        },
        {
            name: "Maternity",
            value: "maternity"
        },
        {
            name: "Special",
            value: "special"
        },
        {
            name: "Unpaid",
            value: "unpaid"
        },
    ]


    const source = [
        {
            name: "",
            value: ""
        },
        {
            name: "Source",
            value: "source"
        },
        {
            name: "Banked",
            value: "banked"
        },
    ]

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new vehicle</h2>
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
                            label={'Number Plate'}
                            name={'numberPlate'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Service Date'}
                            name={'serviceDate'}
                            register={register}
                            type='date'
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Next Service'}
                            name={'nextService'}
                            register={register}
                            type='date'
                            className='w-full'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Service type'}
                            name={'serviceType'}
                            register={register}
                            className='w-full text-black'
                            options={type}
                        />
                        <TextInput
                            errors={errors}
                            label={'Radio License'}
                            name={'radioLicense'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Vehicle License'}
                            name={'vehicleLicense'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Mileage'}
                            name={'mileage'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Status'}
                            name={'status'}
                            register={register}
                        />
                        {/* <ImageInput
                            label={'Attachment'}
                            setImageUrl={setImageUrl}
                            imageUrl={imageUrl}
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Reason'}
                            name={'reason'}
                            register={register}
                        /> */}
                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='Leave'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form