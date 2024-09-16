import Navbar from '@main/components/navbar'
import Main from '@main/components/scores/Main'
import Sidebar from '@main/components/sidebar'
import { getStudents, getStudentsWithScores } from '@main/models_v2/drizzle'
import React from 'react'

export default async function scores() {

  const header = [
    'Name', 'Username', 'Pre Test', 'Post Test'
  ]

  const get_data = async () => {
    const students = await getStudentsWithScores()


    console.log(students)
    let data : any = []

    if(students){


      if (students.length <= 0){
        return []
      }

      students.forEach((student : any) => {

        data.push({
          id : student.students.id,
          name : student.students.name,
          username : student.students.username,
          pre_test : student.scores.preTest,
          post_test : student.scores.postTest
        })
      });

      return data;
    }
  }

  var data = await get_data()

  console.log(data)

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



