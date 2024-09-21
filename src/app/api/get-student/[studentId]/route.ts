import { getStudent } from "@main/models_v2/drizzle";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest, { params }: { params : { studentId : string }}) {
    const studentId = Number(params.studentId)

    const student = await getStudent(studentId)

    return NextResponse.json(student, {status : 200})
}
