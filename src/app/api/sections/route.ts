import SectionModel from "@main/models/sections";
import { Section } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    const sections = await SectionModel.getAll()

    if(sections){
        return NextResponse.json({
            data : sections
        })
    }

    return NextResponse.json({
        data: []
    })

}

// Create new section entry
export async function POST(req : NextRequest) {

    const req_body = await req.json() as Section

    const newSection = new SectionModel(req_body)

    const data = await newSection.save()

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
