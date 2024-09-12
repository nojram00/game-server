import StudentModel from "@main/models/student"
import { Score } from "@main/types/types"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    studentId : string
}
export async function PATCH(req : NextRequest, {params} : { params : Params }) {
    const studentId = params.studentId

    const requestBody = await req.json() as Score

    const data = await StudentModel.find(params.studentId)


    // console.log(data?.student)
    if (data){
        const res = await data.updateScore(requestBody)

        // console.log(res) // null

        if (res){
            return NextResponse.json({
                message : "Score Updated!",
                data : res
            })
        }
    }


    return NextResponse.json({
            message : "Score fail to update...",
        }, { status : 500 })
}
