
import SectionModel from "@main/models/sections";
import { getSectionStudents } from "@main/models_v2/drizzle";
import { Student, Teacher } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

interface Params{
    userId : string,
}

export async function GET(req: NextRequest, {params} : { params : Params }) {
    const sectionId = params.userId

    const data = await getSectionStudents(Number(sectionId))

    if(data)
    {
        return NextResponse.json(
            {
                message: `Getting students list from section id: ${sectionId}`,
                data : data
            }
        )
    }
}

interface RequestBody {
   req_type : "add-teacher" | "add-student"
   data : Student | Teacher
}

// Add teacher and students
export async function PATCH(req: NextRequest, {params} : { params : Params }) {
    const { req_type } = await req.json()
    switch( req_type ){
        case "add-teacher":

            return

        case "add-student":

            return

        default:
            return
    }

}
