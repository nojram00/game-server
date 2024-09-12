import AddTeacher from '@main/components/forms/AddTeacher'
import React from 'react'

export default function AddTeacherPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div>
            <h1 className='text-2xl font-500 mb-3'>Add Teacher</h1>
            <AddTeacher />
        </div>
    </div>
  )
}
