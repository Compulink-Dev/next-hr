'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'

function UpdateForm({ initialData }: any) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialData })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      const response = await fetch(`/api/companies/${initialData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        toast.success('Company updated successfully')
        reset()
        router.push('/dashboard/sales/companies')
      }
    } catch (error) {
      toast.error('Company failed to update')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Company</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Company name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Website'} name={'website'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Email'} name={'email'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Phone'} name={'phone'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Address'} name={'address'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Description'} name={'description'} register={register} className='w-full' isRequired={false} />
          </div>
          <SubmitButton isLoading={loading} title='changes' />
        </form>
      </div>
    </section>
  )
}

export default UpdateForm