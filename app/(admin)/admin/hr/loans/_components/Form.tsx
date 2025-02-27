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
import { useSession } from 'next-auth/react'


function Form() {

    const { data: session } = useSession()

    const userName = session?.user?.name || 'name'


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [attachment, setAttachment] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    async function onSubmit(data: any) {
        data.name = userName
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch('/api/loans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status} ${response.statusText}`)
            }
            if (response.ok) {
                console.log(response);
                toast.success('Loan created successfully')
                reset()
                setLoading(false)
                router.push('/admin/hr/loans')
            }
        } catch (error) {
            toast.error('Loan creation in progress')
            console.log(error);
            setTimeout(() => {
                toast.error('Failed to create loan')
                setLoading(false)
                window.location.reload()
            }, 5000) // 5 minutes in milliseconds
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Loan</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Payment'}
                            name={'payment'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Loan type'}
                            name={'type'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Amount'}
                            name={'amount'}
                            register={register}
                            className='w-full'
                            type='number'
                        />
                        <TextInput
                            errors={errors}
                            label={'Loan repayment'}
                            name={'repayment'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Loan repayments'}
                            name={'repayments'}
                            register={register}
                            className='w-full'
                            type='number'
                        />
                        <TextInput
                            errors={errors}
                            label={'Reason'}
                            name={'reason'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Loan interest'}
                            name={'interest'}
                            register={register}
                        />
                        <TextInput
                            errors={errors}
                            label={'Installments'}
                            name={'installment'}
                            register={register}
                            type='number'
                        />
                        {/* <ImageInput
                            label={'Attachment'}
                            setImageUrl={setAttachment}
                            imageUrl={attachment}
                        /> */}
                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='Loan'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form