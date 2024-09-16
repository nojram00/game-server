import Navbar from '@main/components/navbar'
import Sidebar from '@main/components/sidebar'
import Main from '@main/components/student-profile/Main'
import StudentModel from '@main/models/student'
import { getStudentInfo, getStudent } from '@main/models_v2/drizzle'
import React from 'react'

interface Score{
    pre_test : number
    post_test : number
}

interface Progress {
    quantum_mastery : number,
    ecology_mastery : number,
    momentum_mastery : number,
    tera_mastery : number
}

export default async function studentProfile({params} : {params : {id : string}}) {

    const student = await getStudent(Number(params.id))

    console.log(student)

    const getScoreData = async () => {

        let data : Score
        if(student){
            data = {
                post_test : Number(student.score?.postTest),
                pre_test : Number(student.score?.preTest)
            }

            return data
        }

        return {
            post_test : 0,
            pre_test : 0
        }

    }

    const getProgressData = async () => {

        let data : Progress
        if(student){
            data = {
                quantum_mastery : Number(student.progress?.quantumMastery),
                ecology_mastery : Number(student.progress?.ecologyMastery),
                momentum_mastery : Number(student.progress?.momentumMastery),
                tera_mastery : Number(student.progress?.teraMastery)
            }

            return data
        }

        return {
                quantum_mastery : 0,
                ecology_mastery : 0,
                momentum_mastery : 0,
                tera_mastery : 0
        }
    }
    const score_data = await getScoreData()
    const progress_data = await getProgressData()


    return (
    <div className='flex flex-col'>
        <Navbar headerName='Student Profile'/>
        <div className='flex flex-row'>
            <div>
                <Sidebar />
            </div>
            <div className='w-full p-5'>
                <Main score={score_data} progress={progress_data}/>
            </div>
        </div>
    </div>
  )
}
