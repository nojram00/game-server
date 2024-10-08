import { createSection, getSections } from "@main/models_v2/drizzle";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    const sections = await getSections()

    if(sections){
        return NextResponse.json(sections)
    }

    return NextResponse.json([])

}

// Create new section entry
export async function POST(req : NextRequest) {

    const { teacherId , section_name } = await req.json()

    // const newSection = new SectionModel(req_body)

    // const data = await newSection.save()

    const data = await createSection((teacherId as number), (section_name as string))

    console.log(data)
    if (data){
        return NextResponse.json({
            message: "Section Added",
            data: data
        })
    }

    return NextResponse.json({
        message: "Internal Server Error!",
    }, { status : 500 })
}

interface Params{
    id : number
}

// Update existing
export async function PATCH(req : NextRequest){

}
