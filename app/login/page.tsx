'use client'
import { Timer } from 'lucide-react'
import React from 'react'
import LoginForm from './_components/LoginForm'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function Login() {

    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <p className="">Loading user please wait....</p>
    }

    if (status === 'authenticated') {
        return (
            redirect('/dashboard/home')
        )
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center p-8 mx-auto md:h-screen lg:py-0">
                {/** Logo */}
                <Timer />
                Inventory
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight dark:text-white">
                            Login to your account
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login