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
import SearchInput from '@/app/(dashboard)/_components/SearchInput'
import SelectInput from '../../../inventory/_components/SelectInput'


function Form() {

    const payments = [
        'USD',
        'Card',
        'Zig'
    ]

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
            const response = await fetch('/api/reports/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Sales report created successfully')
                reset()
                setLoading(false)
                router.push('/dashboard/reports/sales')
            }
        } catch (error) {
            toast.error('Sales report failed to create')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Sales Report</h2>
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
                            type='date'
                        />
                        <SelectInput
                            label=""
                            name=""
                            register={register}
                            options={payments}
                        />
                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='Sales Report'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form