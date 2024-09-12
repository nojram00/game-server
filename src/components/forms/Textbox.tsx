import React from 'react'

interface Props{
    children? : React.ReactNode,
    type: string,
    placeholder : string,
    name? : string,
    pos: "left" | "right"
}

export default function Textbox(props : Props) {
  return (
    <label className="input input-bordered flex items-center gap-2">
        { props.pos === 'left' && props.children }
        <input name={props.name} type={props.type} className="grow" placeholder={props.placeholder} />
        { props.pos === 'right' && props.children }
    </label>
  )
}
