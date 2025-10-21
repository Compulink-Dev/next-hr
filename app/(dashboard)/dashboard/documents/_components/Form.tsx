'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../inventory/_components/TextInput'
import SubmitButton from '../../inventory/_components/SubmitButton'
import SelectInput from '../../inventory/_components/SelectInput'
import UploadThing from "@/app/(dashboard)/_components/UploadThing"
import { useRouter } from 'next/navigation'

export default function DocumentForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [attachment, setAttachment] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(data: any) {
    if (!attachment) {
      toast.error('Please upload a file first')
      return
    }
    setLoading(true)
    try {
      const payload = {
        name: data.name,
        subTitle: data.subTitle,
        category: data.category,
        attachment,
        visibility: data.visibility,
      }
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        toast.error(res.status === 403 ? 'Forbidden' : 'Failed to create document')
        setLoading(false)
        return
      }
      toast.success('Document created')
      reset()
      router.push('/dashboard/documents')
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const visibilityOptions = [
    { id: 'private', name: 'private' },
    { id: 'shared', name: 'shared' },
    { id: 'org', name: 'org' },
  ]

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Document</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Document name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Sub Title'} name={'subTitle'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Category'} name={'category'} register={register} className='w-full' />
            <SelectInput errors={errors} label={'Visibility'} name={'visibility'} register={register} className='w-full' options={visibilityOptions} />
          </div>
          <div className="mt-4">
            <UploadThing label={'Attachment'} imageUrl={attachment} setImageUrl={setAttachment} />
          </div>
          <SubmitButton isLoading={loading} title='Document' />
        </form>
      </div>
    </section>
  )
}