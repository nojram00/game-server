import StudentModel from "@main/models/student";
import { Student } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {

    const requestBody = await req.json() as Student

    const student = new StudentModel(requestBody)

    const data = await student.save()

    if (data) {
        return NextResponse.json({
            message : "Student Added!",
            ...data
        }, { status :  200})
    }

    return NextResponse.json({
        "message" : "Internal Server Error!"
    }, { status : 500 })
}
