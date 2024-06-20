'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../../_components/TextInput'
import TextareaInput from '../../_components/TextArea'
import SubmitButton from '../../_components/SubmitButton'
import SelectInput from '../../_components/SelectInput'


function TransferForm() {

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
            const response = await fetch('/api/adjustments/transfer', {
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

    const warehouse = [
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
            <div className="px-4 mx-auto max-w-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new transfer adjustment</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <TextInput
                            errors={errors}
                            label={'Enter quantity of stock to transfer'}
                            name={'qtyStock'}
                            register={register}
                            type='number'
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the warehouse to release stock'}
                            name={'givingWarehouseId'}
                            register={register}
                            className='w-full'
                            options={warehouse}
                        />
                        <SelectInput
                            errors={errors}
                            label={'Select the warehouse to receive stock'}
                            name={'receivingWarehouseId'}
                            register={register}
                            className='w-full'
                            options={warehouse}
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
                        title='Adjustment'
                    />
                </form>
            </div>
        </section>
    )
}

export default TransferForm