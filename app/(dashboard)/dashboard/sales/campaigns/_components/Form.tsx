'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import SelectInput from '../../../inventory/_components/SelectInput'
import { useRouter } from 'next/navigation'

export default function CampaignForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const statusOptions = [
    { id: 'active', name: 'active' },
    { id: 'paused', name: 'paused' },
    { id: 'completed', name: 'completed' },
  ]

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      if (data.budget) data.budget = parseFloat(data.budget)
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        toast.error('Failed to create campaign')
        setLoading(false)
        return
      }
      toast.success('Campaign created')
      reset()
      router.push('/dashboard/sales/campaigns')
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Campaign</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Type'} name={'type'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Channel'} name={'channel'} register={register} className='w-full' isRequired={false} />
            <SelectInput label={'Status'} name={'status'} register={register} className='w-full' options={statusOptions} />
            <TextInput errors={errors} label={'Start Date'} name={'startDate'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'End Date'} name={'endDate'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Budget'} name={'budget'} register={register} className='w-full' isRequired={false} />
          </div>
          <SubmitButton isLoading={loading} title='Campaign' />
        </form>
      </div>
    </section>
  )
}