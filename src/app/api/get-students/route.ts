import { db, getStudents } from "@main/models_v2/drizzle";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try
    {
        // const students = await StudentModel.getAll()
        const students = getStudents()

        if (students){

            return NextResponse.json(students, { status : 200 })
        }

    }
    catch(err)
    {
        return NextResponse.json({
            message : `Error: ${err}`
        }, {status : 500})
    }
}
