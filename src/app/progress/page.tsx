import Navbar from '@main/components/navbar'
import Main from '@main/components/progress/Main'
import Sidebar from '@main/components/sidebar'
import StudentModel from '@main/models/student'
import { getStudentWithProgress } from '@main/models_v2/drizzle'
import { Student } from '@main/types/types'
import React from 'react'

export default async function progress() {
 const header = [
    'Name', 'Username', 'Quantum Mastery', 'Ecology Mastery', 'Momentum Mastery', 'Tera Mastery'
 ]

 const get_data = async () => {
    const students = await getStudentWithProgress()


    let data : any = []

    if(students){


      if (students.length <= 0){
        return []
      }

      students.forEach((student : any) => {
        data.push({
          name : student.students.name,
          username : student.students.username,
          quantum_mastery : student.progress.quantumMastery,
          ecology_mastery : student.progress.ecologyMastery,
          momentum_mastery : student.progress.momentumMastery,
          tera_mastery : student.progress.teraMastery
        })
      });

      return data;
    }
  }

  var data = await get_data()

  return (
    <div className='flex flex-col'>
        <Navbar headerName='Progress'/>

        <div className='flex flex-row'>
          <div>
            <Sidebar />
          </div>

          <div className='w-full'>
            <Main header_row={header} data_row={data}/>
          </div>
        </div>
    </div>
  )
}
