'use client'
import React, { useState } from 'react'
import Users from './Users'
import Admin from './Admin'


function HumanResource
    () {

    const [admin, setAdmin] = useState(false)

    return (
        <div className="">
            {
                !admin ? (
                    <Users />
                ) : (
                    <Admin />
                )
            }
        </div>
    )
}

export default HumanResource
