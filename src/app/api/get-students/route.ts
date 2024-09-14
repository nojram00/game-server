import StudentModel from "@main/models/student";
import { db, Student } from "@main/models_v2/drizzle";
// import { Student } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try
    {
        // const students = await StudentModel.getAll()
        const students = db.select().from(Student)

        if (students){

            // if (students.length <= 0){
            //     return NextResponse.json({
            //         messsage: "No students found..."
            //     }, {status : 400})
            // }

            const result = await students.execute()

            return NextResponse.json({
                data : result
            }, { status : 200 })
        }

    }
    catch(err)
    {
        return NextResponse.json({
            message : `Error: ${err}`
        }, {status : 500})
    }
}
