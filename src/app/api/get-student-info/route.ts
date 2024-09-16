import { secret_key } from "@main/config/environment";
import { getStudent } from "@main/models_v2/drizzle";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {

    const { token } = await req.json()

    if (token) {
        try
        {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(secret_key))

            if(payload){
                const student = await getStudent(Number(payload.id))

                if(student) {
                    return NextResponse.json({
                        data : student
                    })
                }
        }
        }
        catch
        {
            return NextResponse.json({
                message : "Invalid Token",
                token : token
            }, { status : 400 })
        }

    }

    return NextResponse.json({
        message : "Invalid Token",
        token : token
    }, { status : 400 })
}
