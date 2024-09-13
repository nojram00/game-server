import AddClassForm from '@main/components/forms/AddClassForm'
import Navbar from '@main/components/navbar'
import Sidebar from '@main/components/sidebar'
import { TeacherModel } from '@main/models/teacher'
import { Teacher } from '@main/types/types'
import React from 'react'

export default async function AddClass() {
  const teachers = await TeacherModel.getAll() as Array<Teacher>

  const teacher_data = teachers.filter((teacher : Teacher) => teacher.isAdmin === false)
  console.log(teacher_data)
  return(
    <div className='flex flex-col'>
        <Navbar headerName='Dashboard'/>
        <div className='flex flex-row'>
          <div>
          <Sidebar />
          </div>
          <div className='w-full flex flex-col items-center'>
              <h1 className='text-2xl font-500 mb-3 text-center'>Add New Section</h1>
              <AddClassForm data={teacher_data}/>
          </div>
        </div>
    </div>
  )
}
