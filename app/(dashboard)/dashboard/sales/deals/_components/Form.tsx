'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TextInput from '../../../inventory/_components/TextInput'
import SubmitButton from '../../../inventory/_components/SubmitButton'
import SelectInput from '../../../inventory/_components/SelectInput'
import { useRouter } from 'next/navigation'

export default function DealForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const [stages, setStages] = React.useState<any[]>([])
  const [companies, setCompanies] = React.useState<any[]>([])
  const [leads, setLeads] = React.useState<any[]>([])

  React.useEffect(() => {
    async function fetchAll() {
      try {
        const [stRes, coRes, leRes] = await Promise.all([
          fetch('/api/pipeline'),
          fetch('/api/companies'),
          fetch('/api/leads')
        ])
        if (stRes.ok) {
          const s = await stRes.json()
          setStages([{ id: '', name: 'None' }, ...s.map((x: any) => ({ id: x.id, name: x.name }))])
        }
        if (coRes.ok) {
          const c = await coRes.json()
          setCompanies([{ id: '', name: 'None' }, ...c.map((x: any) => ({ id: x.id, name: x.name }))])
        }
        if (leRes.ok) {
          const l = await leRes.json()
          setLeads([{ id: '', name: 'None' }, ...l.map((x: any) => ({ id: x.id, name: x.name }))])
        }
      } catch (e) {
        // ignore
      }
    }
    fetchAll()
  }, [])

  const statusOptions = [
    { id: 'open', name: 'open' },
    { id: 'won', name: 'won' },
    { id: 'lost', name: 'lost' },
  ]

  async function onSubmit(data: any) {
    setLoading(true)
    try {
      if (data.amount) data.amount = parseFloat(data.amount)
      if (data.probability) data.probability = parseInt(data.probability)
      if (data.stageId === '') delete data.stageId
      if (data.companyId === '') delete data.companyId
      if (data.leadId === '') delete data.leadId
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        toast.error('Failed to create deal')
        setLoading(false)
        return
      }
      toast.success('Deal created')
      reset()
      router.push('/dashboard/sales/deals')
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Deal</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput errors={errors} label={'Name'} name={'name'} register={register} className='w-full' />
            <TextInput errors={errors} label={'Amount'} name={'amount'} register={register} className='w-full' />
            <SelectInput errors={errors} label={'Status'} name={'status'} register={register} className='w-full' options={statusOptions} />
            <TextInput errors={errors} label={'Probability'} name={'probability'} register={register} className='w-full' isRequired={false} />
            <TextInput errors={errors} label={'Close Date'} name={'closeDate'} register={register} className='w-full' isRequired={false} />
            <SelectInput label={'Stage'} name={'stageId'} register={register} className='w-full' options={stages} />
            <SelectInput label={'Company'} name={'companyId'} register={register} className='w-full' options={companies} />
            <SelectInput label={'Lead'} name={'leadId'} register={register} className='w-full' options={leads} />
          </div>
          <SubmitButton isLoading={loading} title='Deal' />
        </form>
      </div>
    </section>
  )
}