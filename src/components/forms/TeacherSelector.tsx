'use client'
import { Teacher } from '@main/types/types'
import React from 'react'

interface Props{
    data? : Array<Teacher>
}
export default function TeacherSelector(props : Props) {
  return (
    <select className="select w-full max-w-xs">
        <option className='font-20' defaultValue={0}>Teacher</option>
        {props.data && props.data.map((teacher, i) => (
          <option value={(teacher.userId as string)} key={i}>{teacher.name}</option>
        ))}
    </select>
  )
}
