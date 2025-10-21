'use client'
import React, { useEffect, useState } from 'react'
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
  const [companies, setCompanies] = useState<any[]>([])

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch('/api/companies')
        if (res.ok) {
          const data = await res.json()
          setCompanies([{ id: '', name: 'None' }, ...data.map((c: any) => ({ id: c.id, name: c.name }))])
        }
      } catch (e) {}
    }
    fetchCompanies()
  }, [])

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      if (data.companyId === '') data.companyId = null
      const response = await fetch(`/api/leads/${initialData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        toast.success('Lead updated successfully')
        reset()
        router.push('/dashboard/sales/leads')
      }
    } catch (error) {
      toast.error('Lead failed to update')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const statusOptions = [
    { id: 'new', name: 'new' },
    { id: 'contacted', name: 'contacted' },
    { id: 'qualified', name: 'qualified' },
    { id: 'unqualified', name: 'unqualified' },
    { id: 'converted', name: 'converted' },
  ]

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Lead</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Email'} name={'email'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Phone'} name={'phone'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Source'} name={'source'} register={register} className='w-full' isRequired={false} />
            <SelectInput label={'Status'} name={'status'} register={register} className='w-full' options={statusOptions} />
            <SelectInput label={'Company'} name={'companyId'} register={register} className='w-full' options={companies} />
          </div>
          <SubmitButton isLoading={loading} title='changes' />
        </form>
      </div>
    </section>
  )
}

export default UpdateForm