'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../../_components/TextInput'
import TextareaInput from '../../_components/TextArea'
import SubmitButton from '../../_components/SubmitButton'
import SelectInput from '../../_components/SelectInput'
import { UploadButton } from '@/lib/uploadthing'
import UploadThing from '@/app/(dashboard)/_components/UploadThing'
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
    async function onSubmit(data: any) {
        data.imageUrl = imageUrl
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                reset()
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const categoryOptions = [
        {
            label: "",
            value: ""
        },
        {
            label: "Laptops",
            value: "laptops"
        },
    ]

    const unitOptions = [
        {
            label: "",
            value: ""
        },
        {
            label: "Kg",
            value: "1121212313123"
        },
        {
            label: "Pcs",
            value: "1121212313123"
        },
    ]

    const brandOptions = [
        {
            label: "",
            value: ""
        },
        {
            label: "Hp",
            value: "1121212313123"
        },
        {
            label: "Dell",
            value: "1121212313123"
        },
    ]

    const supplier = [
        {
            label: "",
            value: ""
        },
        {
            label: "NemStach",
            value: "1121212313123"
        },
        {
            label: "Bighands",
            value: "1121212313123"
        },
    ]



    const warehouseOptions = [
        {
            label: "",
            value: ""
        },
        {
            label: "Pomona",
            value: "1121212313123"
        },
        {
            label: "In-House",
            value: "1121212313123"
        },
    ]

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Item</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Item title'}
                            name={'title'}
                            register={register}
                            className='w-full'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the item category'}
                            name={'categoryId'}
                            register={register}
                            className='w-full'
                            options={categoryOptions}
                        />
                        <TextInput
                            errors={errors}
                            label={'Item SKU'}
                            name={'sku'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Item Barcode'}
                            name={'barcode'}
                            register={register}
                            isRequired={false}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Item quantity'}
                            name={'quantity'}
                            register={register}
                            className='w-full'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select item unit'}
                            name={'unitId'}
                            register={register}
                            className='w-full'
                            options={unitOptions}
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select item brand'}
                            name={'brandId'}
                            register={register}
                            className='w-full'
                            options={brandOptions}
                        />
                        <TextInput
                            errors={errors}
                            label={'Buying price'}
                            name={'buyingPrice'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Selling price'}
                            name={'sellingPrice'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select supplier'}
                            name={'supplierId'}
                            register={register}
                            className='w-full'
                            options={supplier}
                        />
                        <TextInput
                            errors={errors}
                            label={'Re-Order Point'}
                            name={'reOrderPoint'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select warehouse'}
                            name={'warehouseId'}
                            register={register}
                            className='w-full'
                            options={warehouseOptions}
                        />
                        <TextInput
                            errors={errors}
                            label={'Weight'}
                            name={'weight'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Item Dimensions in cm(20 x 30 x 100)'}
                            name={'dimensions'}
                            register={register}
                            className='w-full'
                        />
                        <TextInput
                            errors={errors}
                            label={'Item Tax Rate in %'}
                            name={'taxRate'}
                            register={register}
                            type='number'
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Item notes'}
                            name={'notes'}
                            register={register}
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Item description'}
                            name={'description'}
                            register={register}
                        />
                    </div>
                    <ImageInput
                        label={'Item image'}
                        setImageUrl={setImageUrl}
                        imageUrl={imageUrl}
                    />
                    <SubmitButton
                        isLoading={loading}
                        title='Item'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form