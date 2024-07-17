'use client'
import SubmitButton from '@/app/(dashboard)/dashboard/inventory/_components/SubmitButton'
import TextInput from '@/app/(dashboard)/dashboard/inventory/_components/TextInput'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

function LoginForm() {

    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const [loading, setLoading] = useState(false)
    const [emailErr, setEmail] = useState('')
    console.log(emailErr);

    async function onSubmit(data: any) {
        try {
            console.log(data.email, data.password);
            setLoading(true)
            const loginData = await signIn("credentials", {
                ...data,
                redirect: false
            })

            if (loginData) {
                setLoading(false)
                router.push('/dashboard/home')
            }

        } catch (error) {
            setLoading(false)
            console.log("Network error: ", error);
            toast.error("Something went wrong")

        }
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            action={'#'}
            className='space-y-4 md:space-y-6'>
            <div className="">
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
                <p className="">{"Don't have an account"}</p>
                <Link className='text-blue-800 font-bold' href={'register'}>Register?</Link>
            </div>
        </form>
    )
}

export default LoginForm