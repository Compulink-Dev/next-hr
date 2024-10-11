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
            const response = await fetch('/api/leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Leave created successfully')
                reset()
                setLoading(false)
                router.push('/dashboard/hr/leave')
            }
        } catch (error) {
            toast.error('Leave failed to create')
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
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Leave</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <SelectInput
                            errors={errors}
                            label={'Leave type'}
                            name={'type'}
                            register={register}
                            className='w-full text-black'
                            options={type}
                        />
                        <SelectInput
                            errors={errors}
                            label={'Source'}
                            name={'source'}
                            register={register}
                            className='w-full'
                            options={source}
                        />
                        <TextInput
                            errors={errors}
                            label={'From'}
                            name={'from'}
                            type='date'
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'To'}
                            name={'to'}
                            type='date'
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Duration'}
                            name={'duration'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Contact'}
                            name={'contact'}
                            register={register}
                            className='w-full'
                        />
                        <ImageInput
                            label={'Attachment'}
                            setImageUrl={setImageUrl}
                            imageUrl={imageUrl}
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Reason'}
                            name={'reason'}
                            register={register}
                        />
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