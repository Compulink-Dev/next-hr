'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import SelectInput from '../../../inventory/_components/SelectInput'
import { useRouter } from 'next/navigation'

export default function LeadForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const [companies, setCompanies] = React.useState<any[]>([])

  React.useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await fetch('/api/companies', { method: 'GET' })
        if (res.ok) {
          const data = await res.json()
          const opts = [{ id: '', name: 'None' }, ...data.map((c: any) => ({ id: c.id, name: c.name }))]
          setCompanies(opts)
        }
      } catch (e) {
        // ignore
      }
    }
    fetchCompanies()
  }, [])

  const statusOptions = [
    { id: 'new', name: 'new' },
    { id: 'contacted', name: 'contacted' },
    { id: 'qualified', name: 'qualified' },
    { id: 'unqualified', name: 'unqualified' },
    { id: 'converted', name: 'converted' },
  ]

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      if (data.companyId === '') delete data.companyId
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        toast.error('Failed to create lead')
        setLoading(false)
        return
      }
      toast.success('Lead created')
      reset()
      router.push('/dashboard/sales/leads')
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Lead</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Email'} name={'email'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Phone'} name={'phone'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Source'} name={'source'} register={register} className='w-full' isRequired={false} />
            <SelectInput label={'Status'} name={'status'} register={register} className='w-full' options={statusOptions} />
            <SelectInput label={'Company'} name={'companyId'} register={register} className='w-full' options={companies} />
          </div>
          <SubmitButton isLoading={loading} title='Lead' />
        </form>
      </div>
    </section>
  )
}