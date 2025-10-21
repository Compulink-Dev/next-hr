'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import { useRouter } from 'next/navigation'

export default function StageForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      if (data.order) data.order = parseInt(data.order)
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        toast.error('Failed to create stage')
        setLoading(false)
        return
      }
      toast.success('Stage created')
      reset()
      router.push('/dashboard/sales/pipeline')
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Pipeline Stage</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Order'} name={'order'} register={register} className='w-full' />
          </div>
          <SubmitButton isLoading={loading} title='Stage' />
        </form>
      </div>
    </section>
  )
}