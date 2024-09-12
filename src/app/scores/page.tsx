import Navbar from '@main/components/navbar'
import Main from '@main/components/scores/Main'
import Sidebar from '@main/components/sidebar'
import Table from '@main/components/table'
import StudentModel from '@main/models/student'
import { Student } from '@main/types/types'
import React from 'react'

export default async function scores() {

  const header = [
    'Name', 'Username', 'Pre Test', 'Post Test'
  ]

  const get_data = async () => {
    const students = await StudentModel.getAll()


    let data : any = []

    if(students){


      if (students.length <= 0){
        return []
      }

      students.forEach((student : Student) => {

        data.push({
          id : student.studentId,
          name : student.name,
          username : student.username,
          pre_test_score : student.score?.pre_test,
          post_test_score : student.score?.post_test
        })
      });

      return data;
    }
  }

  var data = await get_data()

  return (
    <div className='flex flex-col'>
        <Navbar headerName='Scores'/>

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



