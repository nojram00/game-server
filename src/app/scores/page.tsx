import Navbar from '@main/components/navbar'
import Main from '@main/components/scores/Main'
import Sidebar from '@main/components/sidebar'
import Table from '@main/components/table'
import { User, UserModel } from '@main/types/types'
import React from 'react'

export default async function scores() {

  const header = [
    'Name', 'Username', 'Pre Test', 'Post Test'
  ]

  const get_data = async () => {
    const users = await UserModel.retrieveAll()


    let data : any = []
    if(users){
      const students : Array<User> | any = users.filter((s : any) => s.role === 1)

      if (students.length <= 0){
        return []
      }

      students.forEach((student : User) => {
        console.log(student)
        data.push({
          id : student.userId,
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



