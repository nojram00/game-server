import { hashPassword } from "@main/libs/PasswordGenerator";
import { generateToken } from "@main/libs/Session";
import StudentModel from "@main/models/student";
import { db, insertStudent, Student, StudentType } from "@main/models_v2/drizzle";
// import { Student } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {

    const { username, password, name, section_id, score_id, progress_id } = await req.json()

    const data = await insertStudent({
        username : username,
        password : hashPassword(password),
        name : name,
        section : section_id,
        score : score_id,
        progress : progress_id
    })


    if (data) {

        const token = await generateToken({
            username : data[0].username,
            id : data[0].id,
            section : data[0].section
        })

        return NextResponse.json({
            message : "Student Added!",
            token : token,
            data : {
                id : data[0].id,
                name : data[0].name,
                username : data[0].username,
            }
        }, { status :  200})
    }

    return NextResponse.json({
        "message" : "Internal Server Error!"
    }, { status : 500 })
}
