
import SectionModel from "@main/models/sections";
import { NextRequest, NextResponse } from "next/server";

interface Params{
    userId : string,
    type : "add-teacher" | "add-student"
}

export async function GET(req: NextRequest, {params} : { params : Params }) {
    const sectionId = params.userId

    const data = await SectionModel.find(sectionId)

    return NextResponse.json(
        {
            message: `Getting students list from section id: ${sectionId}`,
            data : data?.getData()
        }
    )
}


// Add teacher and students
export async function PATCH(req: NextRequest, {params} : { params : Params }) {
    switch(params.type){
        case "add-teacher":

            return

        case "add-student":

            return

        default:
            return
    }

}
