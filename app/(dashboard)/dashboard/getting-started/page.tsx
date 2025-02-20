import React from 'react'
import HomeLayout from '../../_components/home-layout'
import Link from 'next/link'

function GettingStarted() {
    return (
        <HomeLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Get Started</h1>
                <p className="mb-4">
                    {' Welcome to the application! Follow the steps below to get started:'}
                </p>
                <ol className="list-decimal list-inside mb-6">
                    <li className="mb-2">{"Create an account if you haven't already."}</li>
                    <li className="mb-2">Explore the dashboard to see key metrics.</li>
                    <li className="mb-2">Visit the inventory section to manage your products.</li>
                    <li className="mb-2">Check the sales section to track your performance.</li>
                    <li className="mb-2">Use the HR section to manage employee information.</li>
                </ol>
                <p className="mb-4">{"For more detailed instructions, visit our"} <Link href="/documentation" className="text-blue-500 underline">documentation</Link>.</p>
                <p>
                    {"If you have any questions, feel free to"} <Link href="/contact" className="text-blue-500 underline">contact us</Link>.
                </p>
            </div>
        </HomeLayout>
    )
}

export default GettingStarted