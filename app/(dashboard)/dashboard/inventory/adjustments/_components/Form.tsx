'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../../_components/TextInput'
import TextareaInput from '../../_components/TextArea'
import SubmitButton from '../../_components/SubmitButton'
import SelectInput from '../../_components/SelectInput'
import toast from 'react-hot-toast'


function Form({ items, warehouse, suppliers }: any) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [loading, setLoading] = useState(false)
    async function onSubmit(data: any) {
        setLoading(true)
        try {
            console.log(data);
            const response = await fetch('/api/adjustments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log(response);
                toast.success('Adjustment created successfully')
                reset()
                setLoading(false)
            } else {
                setLoading(false)
                if (response.status == 409) {
                    toast.error('Giving warehouse stock insufficient')
                } else {
                    toast.error('Failed to create')
                }
            }
        } catch (error) {
            toast.error('Adjustment failed to create')
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="px-4 mx-auto max-w-2xl ">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new adjustment</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Reference Number'}
                            name={'referenceNumber'}
                            register={register}
                            type='number'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the item'}
                            name={'itemId'}
                            register={register}
                            className='w-full'
                            options={items}
                        />
                        <TextInput
                            errors={errors}
                            label={'Enter quantity of stock to add'}
                            name={'addStockQty'}
                            register={register}
                            type='number'
                            className='w-full'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the warehouse to receive stock '}
                            name={'receivingWarehouseId'}
                            register={register}
                            className='w-full'
                            options={warehouse}
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the supplier to receive stock '}
                            name={'supplierId'}
                            register={register}
                            className='w-full'
                            options={suppliers}
                        />
                        <TextareaInput
                            errors={errors}
                            label={'Adjustment notes'}
                            name={'notes'}
                            register={register}
                        />

                    </div>
                    <SubmitButton
                        isLoading={loading}
                        title='Add Stock'
                    />
                </form>
            </div>
        </section>
    )
}

export default Form