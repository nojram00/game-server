import AddTeacher from '@main/components/forms/AddTeacher'
import SectionModel from '@main/models/sections'
import { Section } from '@main/types/types'
import React from 'react'

export default async function AddTeacherPage() {
  const sections = await SectionModel.getAll() as Array<Section>
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div>
            <h1 className='text-2xl font-500 mb-3'>Add Teacher</h1>
            <AddTeacher data={sections}/>
        </div>
    </div>
  )
}
