'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'
import { useRouter } from 'next/navigation'
import SelectInput from '../../../inventory/_components/SelectInput'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'
import { useSession } from 'next-auth/react'


function Form() {

    const { data: session } = useSession()

    const userName = session?.user?.name || 'name'


    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [transitDuration, setTransitDuration] = useState<number | null>(null)
    const router = useRouter()


    const status = watch('status')
    const transitStart = watch('transitStart')

    // Update transit duration when status changes to "Available"
    useEffect(() => {
        if (status === 'Available' && transitStart) {
            const end = new Date()
            const start = new Date(transitStart)
            const duration = Math.floor((end.getTime() - start.getTime()) / 1000) // in seconds
            setTransitDuration(duration)
            setValue('transitDuration', duration)
        }
    }, [status, transitStart, setValue])


    async function onSubmit(data: any) {
        data.assignedUser = userName
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
                router.push('/admin/fleet/vehicles')
            } else {
                const errorResponse = await response.json();
                console.error('Error response:', errorResponse);
                toast.error('Vehicle creation failed: ' + errorResponse.message);
            }
        } catch (error) {
            toast.error('Vehicle creation failed: ' + error);
            console.log(error);
            setLoading(false)
        }
        finally {
            setLoading(false);
        }
    }

    const statusOptions = [
        { name: 'Available', value: 'Available' },
        { name: 'In Transit', value: 'In Transit' },
        { name: 'Off Duty', value: 'Off Duty' },
    ]

    const type = [
        {
            name: "",
            value: ""
        },
        {
            name: "Paid",
            value: "paid"
        },
        {
            name: "Due Payment",
            value: "due"
        },
        {
            name: "Not paid",
            value: "not paid"
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
                            label={"Vehicle's name"}
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
                        <SelectInput
                            errors={errors}
                            label={'Status'}
                            name={'status'}
                            register={register}
                            options={statusOptions}
                            className="w-full text-black"
                        />

                        {/* Transit Start (conditional field) */}
                        {status === 'In Transit' && (
                            <TextInput
                                errors={errors}
                                label={'Transit Start Time'}
                                name={'transitStart'}
                                register={register}
                                type="datetime-local"
                                className="w-full"
                            />
                        )}


                        {/* Display Transit Duration (read-only) */}
                        {transitDuration && (
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Transit Duration (seconds)
                                </label>
                                <input
                                    type="text"
                                    value={transitDuration}
                                    readOnly
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-100 text-black"
                                />
                            </div>
                        )}


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
                        title='Vehicle'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form