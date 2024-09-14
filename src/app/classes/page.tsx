import Card1 from '@main/components/cards/card1'
import Navbar from '@main/components/navbar'
import Sidebar from '@main/components/sidebar'
import { getSections } from '@main/models_v2/drizzle'
import Link from 'next/link'
import React from 'react'

export default async function Sections() {

  const section_lists = await getSections()
  return (
    <div className='flex flex-col'>
        <Navbar headerName='Sections'/>

        <div className='flex flex-row'>
        <div>
            <Sidebar />
        </div>

        <div className='w-full p-3 flex flex-col gap-4'>
            <div>
                <Link href={'/add-class'} className='btn btn-info'>Add Section</Link>
            </div>
            { section_lists.map((data, i) => (
                <Card1 key={i}>
                    <Link href={`classes/${data.id}`}>{ data.sectionName }</Link>
                </Card1>
            ))}
        </div>
        </div>
    </div>
  )
}
