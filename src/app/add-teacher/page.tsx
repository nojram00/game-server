 // @ts-nocheck
import AddTeacher from '@main/components/forms/AddTeacher'
import Navbar from '@main/components/navbar'
import Sidebar from '@main/components/sidebar'
import SectionModel from '@main/models/sections'
import { getSections } from '@main/models_v2/drizzle'
import { Section } from '@main/types/types'
import React from 'react'

export default async function AddTeacherPage() {
  const sections = await getSections()
  return (
    <div className='flex flex-col'>
        <Navbar headerName='Dashboard'/>
        <div className='flex flex-row'>
          <div>
          <Sidebar />
          </div>
          <div className='w-full flex flex-col items-center'>
              <h1 className='text-2xl font-500 mb-3 text-center'>Add Teacher</h1>
              <AddTeacher data={sections}/>
          </div>
        </div>
    </div>
  )
}
