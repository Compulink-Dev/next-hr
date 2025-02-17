'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import TextareaInput from '../../../inventory/_components/TextArea'
import SelectInput from '../../../inventory/_components/SelectInput'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'
import { useSession } from 'next-auth/react'


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
    const { data: session } = useSession();
    const userRole = session?.user?.role;

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch(`/api/vehicles/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Vehicle updated successfully')
                reset()
                router.push('/admin/fleet/vehicles')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Vehicle failed to update')
            console.log(error);
            setLoading(false)
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
                            label={'Mileage'}
                            name={'mileage'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        {userRole === "admin" && (
                            <>
                                <SelectInput
                                    errors={errors}
                                    label={'Status'}
                                    name={'status'}
                                    register={register}
                                    options={statusOptions}
                                    className="w-full text-black"
                                />
                                <TextInput
                                    errors={errors}
                                    label={'Vehicle License'}
                                    name={'vehicleLicense'}
                                    register={register}
                                    className='w-full'
                                />
                            </>
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
                        title='changes'
                    />
                </form>
            </div>
        </section>
    )
}

export default UpdateForm