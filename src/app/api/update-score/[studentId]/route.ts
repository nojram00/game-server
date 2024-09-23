import { db, getProgress, updateStudentScore } from "@main/models_v2/drizzle"
import { Score, Student } from "@main/models_v2/schema"
import { eq } from "drizzle-orm"

import { NextRequest, NextResponse } from "next/server"

interface Params {
    studentId : string
}
export async function POST(req : NextRequest, {params} : { params : Params }) {
    const studentId = Number(params.studentId)

    const { postTest, preTest } = await req.json()

    const student = await db.query.Student.findFirst({
        where : eq(Student.id, Number(studentId)),
        with : {
            score : true
        }
    });

    if(student){

        if(student?.score === null){
            const new_score = await db.insert(Score)
                                    .values({
                                        preTest : (preTest !== null && preTest !== undefined ? preTest : 0),
                                        postTest : (postTest !== null && preTest !== undefined ? postTest : 0)
                                    })
                                    .returning();
            const inserted = await db.update(Student)
                                    .set({ score : new_score[0].id })
                                    .where(eq(Student.id, student.id))
                                    .returning();


            if(inserted.length > 0){
                return NextResponse.json({
                    message : "Student Mastery Updated!",
                    data : inserted[0]
               }, { status : 200 })
            }
        }

        var updated_score = { pr : student?.score?.preTest, pt : student?.score?.postTest }
        // update postest only:
        if(preTest === null && preTest === undefined){

            updated_score.pr = preTest
        }
        // update pretest only:
        else if (postTest === null && postTest === undefined)
        {
            updated_score.pt = postTest
        }


        const data = await db.update(Score)
                            .set({
                                preTest : updated_score.pr,
                                postTest : updated_score.pt
                            })
                            .where(eq(Score.id, Number(student?.score?.id)))
                            .returning();
        if (data.length > 0){

            return NextResponse.json({
                    message : "Score Updated!",
                    data : data
            })

        }
    }




    return NextResponse.json({
            message : "Score fail to update...",
        }, { status : 500 })
}
