'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
  const router = useRouter()
  return (
    <button className="btn btn-active btn-ghost" onClick={() => router.back() }>Back</button>
  )
}
