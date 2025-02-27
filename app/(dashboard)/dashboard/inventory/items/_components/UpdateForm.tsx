'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../../_components/TextInput'
import SubmitButton from '../../_components/SubmitButton'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import TextareaInput from '../../_components/TextArea'
import SelectInput from '../../_components/SelectInput'
import ImageInput from '@/app/(dashboard)/_components/UploadThing'


function UpdateForm({ initialData, category, unit, brand, warehouse, supplier }: any) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialData
    })

    const router = useRouter()

    const [imageUrl, setImageUrl] = useState(initialData.imageUrl)
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        data.imageUrl = imageUrl
        try {
            console.log(data);
            const response = await fetch(`/api/items/${initialData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Item updated successfully')
                reset()
                router.push('/admin/inventory/items')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Item failed to update')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update a new Item</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Item name'}
                            name={'name'}
                            register={register}
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
                        <ImageInput
                            label={'Item image'}
                            setImageUrl={setImageUrl}
                            imageUrl={imageUrl}
                        />
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