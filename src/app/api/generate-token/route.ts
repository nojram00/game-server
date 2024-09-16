import { comparePass } from "@main/libs/PasswordGenerator";
import { generateToken } from "@main/libs/Session";
import { getStudent } from "@main/models_v2/drizzle";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const { username, password } = await req.json()

    const result = await getStudent(username);

    if(result){
        const compared = comparePass(password, result.password)

        if(compared){
            const token = await generateToken({
                username : result.username,
                id : result.id,
                section : result.section?.sectionName
            })

            return NextResponse.json({
                message: "Student Found!",
                token : token
            }, { status : 200 })
        }
    }

    return NextResponse.json({
        message : "Student Account Not Found"
    }, { status : 404 })
}
