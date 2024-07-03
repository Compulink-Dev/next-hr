'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../../_components/TextInput'
import TextareaInput from '../../_components/TextArea'
import SubmitButton from '../../_components/SubmitButton'
import SelectInput from '../../_components/SelectInput'
import toast from 'react-hot-toast'
import { makeApiRequest } from '@/lib/apiRequest'


function Form() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        makeApiRequest(
            setLoading,
            "warehouse",
            data,
            'Warehouse',
            reset
        )
    }

    const selectOptions = [
        {
            label: "",
            value: ""
        },
        {
            label: "Pomona",
            value: "pomona"
        },
        {
            label: "Indoor Storage",
            value: "indoor"
        },
        {
            label: "Outdoor Storage",
            value: "outdoor"
        },
    ]

    const selectType = [
        {
            label: "",
            value: ""
        },
        {
            label: "In-house use",
            value: "inHouse"
        },
        {
            label: "Stocking",
            value: "stock"
        },
        {
            label: "Supply",
            value: "supply"
        },
    ]

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Warehouse</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Warehouse name'}
                            name={'name'}
                            register={register}

                        />
                        <SelectInput
                            errors={errors}
                            label={'Warehouse address'}
                            name={'location'}
                            register={register}
                            className='w-full'
                            options={selectOptions}
                        />
                        <SelectInput
                            errors={errors}
                            label={'Warehouse type'}
                            name={'warehouseType'}
                            register={register}
                            className='w-full'
                            options={selectType}
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Warehouse description'}
                            name={'description'}
                            register={register}
                        />
                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='Warehouse'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form