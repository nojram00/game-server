import Navbar from '@main/components/navbar'
import Main from '@main/components/progress/Main'
import Sidebar from '@main/components/sidebar'
import { db, getStudentWithProgress } from '@main/models_v2/drizzle'
import { Student } from '@main/models_v2/schema'
import { count } from 'drizzle-orm'
import Link from 'next/link'
import React from 'react'

export default async function progress({ searchParams } : { searchParams : any }) {

  const { page } = searchParams
  console.log(page)
  const header = [
    'Name', 'Username', 'Quantum Mastery', 'Ecology Mastery', 'Momentum Mastery', 'Tera Mastery'
 ]

  const studentCount = await db.select({ count : count() }).from(Student)
  const pageLimit = Math.round(studentCount[0].count / 12)

  const students = await getStudentWithProgress(page ?? 1)

  return (
    <div className='flex flex-col'>
        <Navbar headerName='Progress'/>

        <div className='flex flex-row'>
          <div>
            <Sidebar />
          </div>

          <div className='w-full flex-row'>
            <Main header_row={header} data_row={students}/>

            <div className='flex flex-row gap-4 my-2 text-2xl justify-center items-center'>
              <Link href={`/progress?page=${Math.min(1, Math.max(Number(page) - 1, pageLimit))}`}>Prev</Link>
              <Link href={`/progress?page=${Math.max(1, Math.min(Number(page ?? 1) + 1, pageLimit))}`}>Next</Link>
            </div>
          </div>
        </div>
    </div>
  )
}
