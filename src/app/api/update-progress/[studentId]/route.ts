import { UserModel } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, { params } : { params : { studentId : string }}) {
    const studentId = params.studentId

    const { quantum_mastery, ecology_mastery, momentum_mastery, tera_mastery } = await req.json()

    const res = await UserModel.updateProgress(studentId, {
        quantum_mastery : quantum_mastery,
        ecology_mastery : ecology_mastery,
        momentum_mastery : momentum_mastery,
        tera_mastery : tera_mastery
    })

    if (res) {
        const student = await UserModel.find(studentId)
        return NextResponse.json({
            message : "Student Mastery Updated!",
            data : student
        })
    }
}
