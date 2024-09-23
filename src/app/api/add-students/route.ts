import { hashPassword } from "@main/libs/PasswordGenerator";
import { generateToken } from "@main/libs/Session";
import { db, insertStudent, StudentType } from "@main/models_v2/drizzle";
import { Progress, Score } from "@main/models_v2/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {

    const { username, password, name, section_id } = await req.json()

    // create a new score instance:
    const new_score = await db.insert(Score).values({
        postTest : 0,
        preTest : 0
    }).returning()

    // create a new progress instance
    const new_progress = await db.insert(Progress).values({
        quantumMastery : 0,
        teraMastery : 0,
        ecologyMastery : 0,
        momentumMastery : 0
    }).returning();

    const data = await insertStudent({
        username : username,
        password : hashPassword(password),
        name : name,
        section : section_id,
        score : new_score[0].id,
        progress : new_progress[0].id
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
                score : new_score[0],
                progress : new_progress[0]
            }
        }, { status :  200})
    }

    return NextResponse.json({
        "message" : "Internal Server Error!"
    }, { status : 500 })
}
