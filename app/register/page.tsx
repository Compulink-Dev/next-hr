import { Timer } from 'lucide-react'
import React from 'react'
import RegistrationForm from './_components/RegistrationForm'

function Register() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center p-8 mx-auto md:h-screen lg:py-0">
                {/** Logo */}
                <Timer />
                Inventory
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight dark:text-white">
                            Create a new account
                        </h1>
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register