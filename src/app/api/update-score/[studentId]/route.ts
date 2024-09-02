import { User, UserModel } from "@main/types/types"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    studentId : string
}
export async function POST(req : NextRequest, {params} : { params : Params }) {
    const studentId = params.studentId

    const { pre_test, post_test } = await req.json()

    const status = await UserModel.updateScore(studentId, {
        pre_test : pre_test,
        post_test : post_test
    })

    if (status){
        const userData : User | null = await UserModel.find(studentId)
        return NextResponse.json({
            message : "Score Updated!",
            data : (userData !== null ? userData : {})
        })
    }

    else{
        return NextResponse.json({
            message : "Score fail to update...",
        })
    }
}
