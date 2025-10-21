'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import SelectInput from '../../../inventory/_components/SelectInput'
import { useRouter } from 'next/navigation'

export default function TaskForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const statusOptions = [
    { id: 'open', name: 'open' },
    { id: 'in_progress', name: 'in_progress' },
    { id: 'done', name: 'done' },
  ]
  const entityTypeOptions = [
    { id: 'company', name: 'company' },
    { id: 'lead', name: 'lead' },
    { id: 'deal', name: 'deal' },
    { id: 'campaign', name: 'campaign' },
  ]

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        toast.error('Failed to create task')
        setLoading(false)
        return
      }
      toast.success('Task created')
      reset()
      router.push('/dashboard/sales/tasks')
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Title'} name={'title'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Description'} name={'description'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Due Date'} name={'dueDate'} register={register} className='w-full' isRequired={false} />
            <SelectInput label={'Status'} name={'status'} register={register} className='w-full' options={statusOptions} />
            <SelectInput label={'Entity Type'} name={'entityType'} register={register} className='w-full' options={entityTypeOptions} />
            <TextInput errors={errors} label={'Entity Id'} name={'entityId'} register={register} className='w-full' />
          </div>
          <SubmitButton isLoading={loading} title='Task' />
        </form>
      </div>
    </section>
  )
}