import StudentModel from "@main/models/student";
import { createProgress, getProgress } from "@main/models_v2/drizzle";
import { Progress } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, { params } : { params : { studentId : string }}) {
    const studentId = Number(params.studentId)

    const { quantum_mastery, ecology_mastery, momentum_mastery, tera_mastery } = await req.json()

    const student = await createProgress({
        quantumMastery : quantum_mastery,
        ecologyMastery : ecology_mastery,
        momentumMastery : momentum_mastery,
        teraMastery : tera_mastery
    }, studentId)

    if (student) {


        return NextResponse.json({
            message : "Student Mastery Updated!",
            data : await getProgress(studentId)
        }, { status : 200 })
    }
}
