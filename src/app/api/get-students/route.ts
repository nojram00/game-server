import StudentModel from "@main/models/student";
import { Student } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try
    {
        const students = await StudentModel.getAll()

        if (students){

            if (students.length <= 0){
                return NextResponse.json({
                    messsage: "No students found..."
                }, {status : 400})
            }

            return NextResponse.json({
                data : students
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
