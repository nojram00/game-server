import { updateStudentScore } from "@main/models_v2/drizzle"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    studentId : string
}
export async function POST(req : NextRequest, {params} : { params : Params }) {
    const studentId = Number(params.studentId)

    const { postTest, preTest } = await req.json()

    const data = await updateStudentScore(studentId, {
        postTest : postTest,
        preTest : preTest
    })

    if (data){

        return NextResponse.json({
            message : "Score Updated!",
            data : data
        })

    }


    return NextResponse.json({
            message : "Score fail to update...",
        }, { status : 500 })
}
