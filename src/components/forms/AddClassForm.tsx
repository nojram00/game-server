'use client'
import React from 'react'
import Textbox from './Textbox'
import TeacherSelector from './TeacherSelector'
import { Teacher } from '@main/types/types'
import { AddClassData } from '@main/actions'

interface Props{
  data? : Array<any>
}
export default function AddClassForm(props : Props) {
  return (
    <div>
    <form action={AddClassData} className='flex flex-col gap-5 items-center justify-center'>
      <Textbox type='text' name='name' placeholder='Section Name' pos='left' >
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
          <path d="m23,18.092v-9.592c0-3.032-2.467-5.5-5.5-5.5H6.5c-3.033,0-5.5,2.468-5.5,5.5v9.592c-.581.207-1,.756-1,1.408,0,.828.671,1.5,1.5,1.5h21c.829,0,1.5-.672,1.5-1.5,0-.652-.419-1.201-1-1.408ZM6.5,6h11c1.378,0,2.5,1.121,2.5,2.5v9.5h-2v-.5c0-.828-.671-1.5-1.5-1.5h-2c-.829,0-1.5.672-1.5,1.5v.5H4v-9.5c0-1.379,1.122-2.5,2.5-2.5Z"/>
        </svg>
      </Textbox>
      <TeacherSelector data={props.data}/>

      <button className='btn btn-accent' type='submit'>Add</button>
    </form>
  </div>
  )
}
