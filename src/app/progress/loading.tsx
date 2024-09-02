import NextTopLoader from 'nextjs-toploader'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  )
}
