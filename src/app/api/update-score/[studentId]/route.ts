import { db, updateStudentScore } from "@main/models_v2/drizzle"
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
