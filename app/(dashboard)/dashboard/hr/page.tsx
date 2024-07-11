'use client'
import React, { useState } from 'react'
import Admin from './_components/Admin'
import Users from './_components/Users'


function HumanResource
    () {

    const [admin, setAdmin] = useState(false)

    return (
        <div className="">
            {
                admin ? (
                    <Users />
                ) : (
                    <Admin />
                )
            }
        </div>
    )
}

export default HumanResource
