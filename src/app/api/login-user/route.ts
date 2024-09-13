import { NextRequest, NextResponse } from "next/server";
import { realtimeDb } from "@config/firebase.config";
import { ref, set, onValue, push, get } from "firebase/database";
import { hash } from "crypto";
import jwt from 'jsonwebtoken';
import { secret_key } from "@config/environment";
import { Student } from "@main/types/types";

interface User{
    username : string;
    password : string;
    [key : string] : any;
}

interface RequestBody{
    username : string;
    password : string;
}

export async function POST(request : NextRequest){
    const req_body : RequestBody = await request.json() as RequestBody
    const userRef = ref(realtimeDb, 'students/')


    const snapshot = await get(userRef)

    let user : Student | null | undefined = null

    let data : Array<Student> = []
    if (snapshot.exists()) {
        snapshot.forEach((s) => {
            data.push({
                studentId : s.key,
                ...(s.val() as Student)
            })
        })


    }

    user = data.find((d) => d.username === req_body.username && d.password === req_body.password)

    if(user && typeof user !== 'undefined'){

        const token = jwt.sign({
            id: user.studentId,
            username: user.username
        }, secret_key, {
            expiresIn: "1d"
        })

        return NextResponse.json({
            data: token
        })
    }

    return NextResponse.json({
        message: "Not Found"
    }, { status : 404 })


}
