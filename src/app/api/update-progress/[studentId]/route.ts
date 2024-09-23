import { createProgress, db, getProgress } from "@main/models_v2/drizzle";
import { Progress, Student } from "@main/models_v2/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, { params } : { params : { studentId : string }}) {
    const studentId = Number(params.studentId)

    const { quantum_mastery, ecology_mastery, momentum_mastery, tera_mastery } = await req.json()

    const student = await db.query.Student.findFirst({
        where : eq(Student.id, Number(studentId)),
        with : {
            progress : true
        }
    });


    if (student) {

        if(student?.progress === null){
            const new_progress = await db.insert(Progress)
                                        .values({
                                            quantumMastery : (quantum_mastery !== null && quantum_mastery !== undefined ? quantum_mastery : 0),
                                            teraMastery : (tera_mastery !== null && tera_mastery !== undefined ? tera_mastery : 0),
                                            momentumMastery : (momentum_mastery !== null && momentum_mastery !== undefined ? momentum_mastery : 0),
                                            ecologyMastery : (ecology_mastery !== null && ecology_mastery !== undefined ? ecology_mastery : 0)
                                        }).returning();
            const inserted = await db.update(Student)
                                        .set({ progress : new_progress[0].id })
                                        .where(eq(Student.id, student.id))
                                        .returning();

            if(inserted.length > 0){
                return NextResponse.json({
                    message : "Student Mastery Updated!",
                    data : await getProgress(inserted[0].id)
                    }, { status : 200 })
                }
        }

        var updated_progress = {
            qm : student.progress?.quantumMastery,
            em : student.progress?.ecologyMastery,
            tm : student.progress?.teraMastery,
            mm : student.progress?.momentumMastery
         }

        if(quantum_mastery !== null && quantum_mastery !== undefined){
            updated_progress.qm = quantum_mastery
        }

        if(momentum_mastery !== null && momentum_mastery !== undefined) {
            updated_progress.mm = momentum_mastery
        }

        if (tera_mastery !== null && tera_mastery !== undefined){
            updated_progress.tm = tera_mastery
        }

        if (ecology_mastery !== null && ecology_mastery !== undefined){
            updated_progress.em = ecology_mastery
        }

        const result = await db.update(Progress)
                                .set({
                                    teraMastery : updated_progress.tm,
                                    ecologyMastery : updated_progress.em,
                                    momentumMastery : updated_progress.mm,
                                    quantumMastery : updated_progress.qm,
                                })
                                .where(eq(Progress.id, Number(student.progress?.id)))
                                .returning()


        if(result.length > 0){
            return NextResponse.json({
                message : "Student Mastery Updated!",
                data : await getProgress(studentId)
            }, { status : 200 })
        }
    }

    return NextResponse.json({
        message : "Error!",
    }, { status : 500 })
}
