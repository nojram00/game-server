import React from 'react'

interface Props{
    defaultValue? : any
    label : string
    type : string | "text" | "password" | "email"
    placeholder? : string
    name? : string
}

export default function Textbox(props : Props) {
  return (
    <div className='form-control'>
        <div className='label'>
            <label className='label-text'>{props.label}</label>
        </div>
        <input name={props.name} className='input input-bordered input-primary w-full max-w-xs' type={props.type} placeholder={props.placeholder} defaultValue={props.defaultValue}/>
    </div>
  )
}
