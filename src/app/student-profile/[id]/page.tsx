import Main from '@main/components/student-profile/Main'
import { User, UserModel, Score, Progress } from '@main/types/types'
import React from 'react'


export default async function studentProfile({params} : {params : {id : string}}) {

    const getScoreData = async () => {
        const user : User | null = await UserModel.find(params.id)

        let data : Score
        if(user){
            data = {
                post_test : (typeof user.score?.post_test !== 'undefined' ? user.score.post_test : 0),
                pre_test : (typeof user.score?.pre_test !== 'undefined' ? user.score.pre_test : 0)
            }

            return data
        }

        return {
            post_test : 0,
            pre_test : 0
        }

    }

    const getProgressData = async () => {
        const user : User | null = await UserModel.find(params.id)

        let data : Progress
        if(user){
            data = {
                quantum_mastery : (typeof user.progress?.quantum_mastery !== "undefined" ? user.progress.quantum_mastery : 0),
                ecology_mastery : (typeof user.progress?.ecology_mastery !== "undefined" ? user.progress.ecology_mastery : 0),
                momentum_mastery : (typeof user.progress?.momentum_mastery !== "undefined" ? user.progress.momentum_mastery : 0),
                tera_mastery : (typeof user.progress?.tera_mastery !== 'undefined' ? user.progress?.tera_mastery : 0)
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
