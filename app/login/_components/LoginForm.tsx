'use client'
import SubmitButton from '@/app/(dashboard)/dashboard/inventory/_components/SubmitButton'
import TextInput from '@/app/(dashboard)/dashboard/inventory/_components/TextInput'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

function LoginForm() {
    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const loginData = await signIn("credentials", {
                ...data,
                redirect: false
            })

            setLoading(false)
            if (loginData?.ok) {
                setLoginSuccess(true)
            } else {
                toast.error("Invalid credentials")
            }
        } catch (error) {
            setLoading(false)
            console.error("Network error: ", error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        if (loginSuccess) {
            router.push('/admin')
        }
    }, [loginSuccess, router])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            action={'#'}
            className='space-y-4 md:space-y-6'>
            <div>
                <TextInput
                    errors={errors}
                    label={'Enter your email'}
                    name={'email'}
                    register={register}
                    type='email'
                    className='w-full'
                />
                <TextInput
                    errors={errors}
                    label={'Enter your password'}
                    name={'password'}
                    register={register}
                    type='password'
                    className='w-full'
                />
            </div>
            <SubmitButton
                isLoading={loading}
                title='Login'
                className="w-full"
            />
            <div className="text-sm flex gap-1 items-center">
                <p>{"Don't have an account?"}</p>
                <Link className='text-blue-800 font-bold' href={'/register'}>Register?</Link>
            </div>
        </form>
    )
}

export default LoginForm
