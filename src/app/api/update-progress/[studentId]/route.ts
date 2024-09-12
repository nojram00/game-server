import StudentModel from "@main/models/student";
import { Progress } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, { params } : { params : { studentId : string }}) {
    const studentId = params.studentId

    const requestBody = await req.json() as Progress

    const student = await StudentModel.find(studentId)

    if (student) {

        const res = student.UpdateProgress(requestBody)

        return NextResponse.json({
            message : "Student Mastery Updated!",
            data : res
        }, { status : 200 })
    }
}
