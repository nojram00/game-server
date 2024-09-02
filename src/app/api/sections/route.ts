import { realtimeDb } from "@main/config/firebase.config";
import { SectionModel, Section } from "@main/types/types";
import { push, ref, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    const sections = await SectionModel.retrieveAll()

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

    const req_body = await req.json()

    console.log(req_body.sectionName)
    const newSection = new SectionModel(req_body.sectionName, req_body.teacher, [])

    const data = await newSection.save()

    return NextResponse.json({
        message: "Section Added",
        data: data
    })
}

interface Params{
    id : number
}

// Update existing
export async function PATCH(req : NextRequest){

}
