'use client'
import React from 'react'
import Table from '../table'
import Link from 'next/link';


interface Props{
    header_row : Array<any>
    data_row : Array<ScoreData>
}

interface ScoreData{
    id: string;
    username : string;
    name : string;
    pre_test : number;
    post_test :number;
}

export default function Main(props : Props) {
  console.log(props.data_row)
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
                        <Link href={`/student-profile/${data.id}`}>{data.name}</Link>
                    </td>
                    <td className='text-2xl'>
                        <Link href={`/student-profile/${data.id}`}>{data.username}</Link>
                    </td >
                    <td className='text-2xl'>
                        {data.pre_test}
                    </td>
                    <td className='text-2xl'>
                        {data.post_test}
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    </div>
  )
}
