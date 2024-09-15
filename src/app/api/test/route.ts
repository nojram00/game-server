import { NextRequest, NextResponse } from "next/server";
import { realtimeDb } from "@config/firebase.config";
import { ref, set, onValue, push } from "firebase/database";
import { randomInt } from "crypto";
import { db, getTeacher, Teacher } from "@main/models_v2/drizzle";
import { comparePass, hashPassword } from "@main/libs/PasswordGenerator";

export async function GET(request : NextRequest){

    const create_admin = await db.insert(Teacher).values({
        username : "admin02",
        password : hashPassword("adminpass002"),
        name : 'admin'
    }).returning()

    return NextResponse.json({
        data : create_admin[0]
    })
}


export async function POST(request : NextRequest){

    const { username, password } = await request.json()

    const check_user = await getTeacher(username)

    console.log(check_user)

    if (comparePass(password, check_user[0].password)){
        return NextResponse.json({
            message: "Success",
            data : check_user[0]
        })
    }

    return NextResponse.json({
        message : "Not Found"
    }, { status : 404 })

}
