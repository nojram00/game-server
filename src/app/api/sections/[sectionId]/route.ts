import { getSectionData } from "@main/models_v2/drizzle";
import { Student, Teacher } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

interface Params{
   sectionId : string,
}

export async function GET(req: NextRequest, {params} : { params : Params }) {
    const sectionId = params.sectionId

    const data = await getSectionData(Number(sectionId))

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
