'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import SelectInput from '../../../inventory/_components/SelectInput'

function UpdateForm({ initialData }: any) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialData })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const statusOptions = [
    { id: 'open', name: 'open' },
    { id: 'in_progress', name: 'in_progress' },
    { id: 'done', name: 'done' },
  ]

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      const response = await fetch(`/api/tasks/${initialData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        toast.success('Task updated successfully')
        reset()
        router.push('/dashboard/sales/tasks')
      }
    } catch (error) {
      toast.error('Task failed to update')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Title'} name={'title'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Description'} name={'description'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Due Date'} name={'dueDate'} register={register} className='w-full' isRequired={false} />
            <SelectInput label={'Status'} name={'status'} register={register} className='w-full' options={statusOptions} />
          </div>
          <SubmitButton isLoading={loading} title='changes' />
        </form>
      </div>
    </section>
  )
}

export default UpdateForm