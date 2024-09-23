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

    let data;

    const student = await db.query.Student.findFirst({
        where : eq(Student.id, Number(studentId))
    });

    // update postest only:
    if(preTest === null || preTest === undefined){
        const d = await db.update(Score)
                            .set({ postTest : Number(postTest) })
                            .where(eq(Score.id, Number(student?.score)))
                            .returning();

        data = d[0];
    }
    // update pretest only:
    else if (postTest === null || postTest === undefined)
    {
        const d = await db.update(Score)
                            .set({ preTest : Number(preTest) })
                            .where(eq(Score.id, Number(student?.score)))
                            .returning();
        data = d[0];
    }
    // update all
    else
    {
        data = await updateStudentScore(studentId, {
            postTest : postTest,
            preTest : preTest
        })
    }


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
