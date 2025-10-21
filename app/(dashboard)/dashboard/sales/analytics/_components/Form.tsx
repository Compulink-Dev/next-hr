'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import SelectInput from '../../../inventory/_components/SelectInput'
import { useRouter } from 'next/navigation'

export default function AnalyticsForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const entityTypeOptions = [
    { id: 'company', name: 'company' },
    { id: 'lead', name: 'lead' },
    { id: 'deal', name: 'deal' },
    { id: 'campaign', name: 'campaign' },
  ]

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      if (data.value) data.value = parseFloat(data.value)
      if (data.context === '') delete data.context
      const res = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        toast.error('Failed to create analytics event')
        setLoading(false)
        return
      }
      toast.success('Analytics event created')
      reset()
      router.push('/dashboard/sales/analytics')
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Analytics Event</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Metric'} name={'metric'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Value'} name={'value'} register={register} className='w-full' />
            <SelectInput errors={errors} label={'Entity Type'} name={'entityType'} register={register} className='w-full' options={entityTypeOptions} />
            <TextInput errors={errors} label={'Entity Id'} name={'entityId'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Context'} name={'context'} register={register} className='w-full' isRequired={false} />
          </div>
          <SubmitButton isLoading={loading} title='Event' />
        </form>
      </div>
    </section>
  )
}