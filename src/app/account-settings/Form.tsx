'use client'
import React from 'react'
import Textbox from './Textbox'
import { changeInfo } from '@main/actions'

export default function Form(props : any) {
  const ref = React.useRef<HTMLFormElement>(null)
  const modalRef = React.useRef(null)

  const submit = () => {
    if(ref.current){
        console.log("Submitted")
        ref.current.submit()
    }
  }

  const showModal = () => {
    const modal = (document.getElementById('prompt') as HTMLFormElement)
    modal?.showModal()
  }

  return (
    <form ref={ref} className='flex flex-col gap-3' action={changeInfo}>
        <Textbox defaultValue={props?.username} type='text' label='Username' name='username'/>
        <Textbox type='password' label='New Password' name='new_password'/>
        <Textbox type='password' label='Password' name='password'/>
        <Textbox type='password' label='Confirm Password' name='confirm_password'/>

        <div className='flex justify-center p-4'>
            <button className='btn btn-accent'>Update</button>
        </div>

        <dialog ref={modalRef} className='modal' id='prompt'>
            <div className='modal-box'>
                <span>Are You sure you want to update info?</span>
                <div className='modal-action'>
                    <form method='dialog' className=' flex gap-4'>
                        <button className='btn btn-success' type='button' onClick={submit}>Yes</button>
                        <button className='btn btn-error'>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </form>
  )
}
