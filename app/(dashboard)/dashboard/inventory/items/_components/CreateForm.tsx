'use client'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'
import React, { useState } from 'react'
import SubmitButton from '../../_components/SubmitButton'
import TextareaInput from '../../_components/TextArea'
import TextInput from '../../_components/TextInput'
import SelectInput from '../../_components/SelectInput'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { makeApiRequest } from '@/lib/apiRequest'


function CreateForm({ brand, category, unit, warehouse, supplier }: any) {
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
            setLoading(true)
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success(`Items created successfully`)
                reset()
                setLoading(false)
            }
            else {
                setLoading(false)
                toast.error('Something went wrong')
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error('Something went wrong')
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Item</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Item name'}
                            name={'name'}
                            register={register}
                            className='w-full'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the item category'}
                            name={'categoryId'}
                            register={register}
                            className='w-full'
                            options={category}
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
                            options={unit}
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select item brand'}
                            name={'brandId'}
                            register={register}
                            className='w-full'
                            options={brand}
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
                            options={warehouse}
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

export default CreateForm