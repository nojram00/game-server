'use client'
import React from 'react'
import Table from '../table'
import Link from 'next/link';
import { StudentType } from '@main/models_v2/drizzle';


interface Props{
    header_row : Array<any>
    data_row : Array<any | object>
}

interface ScoreData{
    id: string;
    username : string;
    name : string;
    pre_test : number;
    post_test :number;
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
                        <Link href={`/student-profile/${data.id}`}>{data.name}</Link>
                    </td>
                    <td className='text-2xl'>
                        <Link href={`/student-profile/${data.id}`}>{data.username}</Link>
                    </td >
                    <td className='text-2xl'>
                        {data.score?.preTest ?? 0}
                    </td>
                    <td className='text-2xl'>
                        {data.score?.postTest ?? 0}
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    </div>
  )
}
