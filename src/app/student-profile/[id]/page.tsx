import Main from '@main/components/student-profile/Main'
import StudentModel from '@main/models/student'
import { Score, Progress } from '@main/types/types'
import React from 'react'


export default async function studentProfile({params} : {params : {id : string}}) {

    const getScoreData = async () => {
        const student : StudentModel | null = await StudentModel.find(params.id)

        const studentInfo = student?.getData()
        let data : Score
        if(studentInfo){
            data = {
                post_test : (typeof studentInfo.score?.post_test !== 'undefined' ? studentInfo.score.post_test : 0),
                pre_test : (typeof studentInfo.score?.pre_test !== 'undefined' ? studentInfo.score.pre_test : 0)
            }

            return data
        }

        return {
            post_test : 0,
            pre_test : 0
        }

    }

    const getProgressData = async () => {
        const student : StudentModel | null = await StudentModel.find(params.id)

        const studentInfo = student?.getData()
        let data : Progress
        if(studentInfo){
            data = {
                quantum_mastery : (typeof studentInfo.progress?.quantum_mastery !== "undefined" ? studentInfo.progress.quantum_mastery : 0),
                ecology_mastery : (typeof studentInfo.progress?.ecology_mastery !== "undefined" ? studentInfo.progress.ecology_mastery : 0),
                momentum_mastery : (typeof studentInfo.progress?.momentum_mastery !== "undefined" ? studentInfo.progress.momentum_mastery : 0),
                tera_mastery : (typeof studentInfo.progress?.tera_mastery !== 'undefined' ? studentInfo.progress?.tera_mastery : 0)
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
    <div className='flex flex-col justify-center items-center'>
        <div className='p-5'>
            <h1 className='text-2xl font-bold'>Student Profile</h1>
        </div>
        <div className='w-[80vw]'>
            <Main score={score_data} progress={progress_data}/>
        </div>
    </div>
  )
}
