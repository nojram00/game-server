'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TableData({ data } : { data : any }) {
    const router = useRouter()

    const navigate = (studentId : number) => {
        router.push(`/student-profile/${studentId}`)
    }
    return (
    <tr className="text-xl cursor-pointer" onClick={() => navigate(Number(data.id))}>
        <td>{ data.name}</td>
        <td>{ data.username }</td>
        <td>{ data.score?.preTest || 0 }</td>
        <td>{ data.score?.postTest || 0}</td>
        <td>{ data.progress?.quantumMastery }</td>
        <td>{ data.progress?.ecologyMastery }</td>
        <td>{ data.progress?.momentumMastery }</td>
        <td>{ data.progress?.teraMastery }</td>
    </tr>
  )
}
