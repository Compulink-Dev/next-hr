import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <div className='p-8'>
      <p className="mb-4">Home</p>
      <Link
        className='border-b border mb-4 p-2 rounded'
        href={'/dashboard/home/overview'}>Dashboard</Link>
    </div>
  )
}

export default HomePage