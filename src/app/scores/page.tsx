import Navbar from '@main/components/navbar'
import Main from '@main/components/scores/Main'
import Sidebar from '@main/components/sidebar'
import { db, getStudents, getStudentsWithScores } from '@main/models_v2/drizzle'
import { Student } from '@main/models_v2/schema'
import { count } from 'drizzle-orm'
import Link from 'next/link'
import React from 'react'

export default async function scores({ searchParams } : { searchParams : any }) {

  const { page } = searchParams
  const header = [
    'Name', 'Username', 'Pre Test', 'Post Test'
  ]

  const studentCount = await db.select({ count : count() }).from(Student)
  const pageLimit = Math.round(studentCount[0].count / 12)


  const students = await getStudentsWithScores(page ?? 1)
  console.log(`Student count : ${Math.floor(studentCount[0].count / 12)}`)
  // console.log(students)

  return (
    <div className='flex flex-col'>
        <Navbar headerName='Scores'/>

        <div className='flex flex-row'>
          <div>
            <Sidebar />
          </div>

          <div className='w-full flex-row'>
            <Main header_row={header} data_row={students}/>

            <div className='flex flex-row gap-4 my-2 text-2xl justify-center items-center'>
              <Link href={`/scores?page=${Math.min(1, Math.max(Number(page ?? 1) - 1, pageLimit))}`}>Prev</Link>
              <Link href={`/scores?page=${Math.max(1, Math.min(Number(page ?? 1) + 1, pageLimit))}`}>Next</Link>
            </div>
          </div>


        </div>

    </div>
  )
}



