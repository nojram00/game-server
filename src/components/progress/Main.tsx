'use client'
import React from 'react'

interface Props{
    header_row : Array<any>
    data_row : Array<ProgressData>
}

interface ProgressData{
    name : string;
    username : string;
    quantum_mastery : number;
    ecology_mastery : number;
    momentum_mastery : number;
    tera_mastery : number;
}

export default function Main(props : Props) {
  return (
    <div className="overflow-x-auto">
        <table className="table table-zebra">
            {/* head */}
            <thead>
            <tr>
                { typeof props.header_row !== 'undefined' && props.header_row.map((row, id) => (
                    <th key={id} className='text-2xl'>{row}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            { typeof props.data_row !== 'undefined' && props.data_row.map((data, id) => (
                <tr key={id}>
                    <td className='text-2xl'>
                        {data.name}
                    </td>
                    <td className='text-2xl'>
                        {data.username}
                    </td>
                    <td className='text-2xl'>
                        {data.quantum_mastery}
                    </td>
                    <td className='text-2xl'>
                        {data.ecology_mastery}
                    </td>
                    <td className='text-2xl'>
                        {data.momentum_mastery}
                    </td>
                    <td className='text-2xl'>
                        {data.tera_mastery}
                    </td>

                </tr>
            ))}

            </tbody>
        </table>
    </div>
  )
}
