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
    pre_test_score : number;
    post_test_score :number;
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
                    <th key={id}>{row}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            { typeof props.data_row !== 'undefined' && props.data_row.map((data, id) => (
                <tr key={id}>
                    <td>
                        <Link href={`/student-profile/${data.id}`}>{data.name}</Link>
                    </td>
                    <td>
                        <Link href={`/student-profile/${data.id}`}>{data.username}</Link>
                    </td>
                    <td>
                        {data.pre_test_score}
                    </td>
                    <td>
                        {data.post_test_score}
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    </div>
  )
}
