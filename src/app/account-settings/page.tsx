import Navbar from '@main/components/navbar'
import Sidebar from '@main/components/sidebar'
import { getSession } from '@main/libs/Session'
import { getTeacherById } from '@main/models_v2/drizzle'
import React from 'react'
import Textbox from './Textbox'
import Form from './Form'

export default async function accountSettings() {

  const session = await getSession()

  const info = await getTeacherById(Number(session?.id))

  return (
    <div className='flex flex-col'>
        <Navbar headerName='Account Settings'/>
        <div className='flex flex-row'>
          <div>
          <Sidebar />
          </div>
          <div className='w-full flex flex-col items-center'>
              <h1 className='text-2xl font-500 mb-3 text-center'>Account Settings</h1>
              <Form username={info.username} password={info.password}/>
          </div>
        </div>
    </div>
  )
}
