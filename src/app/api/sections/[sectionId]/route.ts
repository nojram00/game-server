import { SectionModel, UserModel } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

interface Params{
    sectionId : string
}

export async function GET(req: NextRequest, {params} : { params : Params }) {
    const sectionId = params.sectionId

    const data = await SectionModel.getStudentsBySecId(sectionId)

    return NextResponse.json(
        {
            message: `Getting students list from section id: ${params.sectionId}`,
            data : data
        }
    )
}


// Add teacher and students
export async function PATCH(req: NextRequest, {params} : { params : Params }) {
    const { studentId } = await req.json()

    const result = await UserModel.addSection(studentId, params.sectionId)

    if(result){
        const data = await UserModel.find(studentId)
        return NextResponse.json(
            {
                data : data
            }
        )
    }

}
