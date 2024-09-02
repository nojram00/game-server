import { NextRequest, NextResponse } from "next/server";
import { realtimeDb } from "@config/firebase.config";
import { ref, set, onValue, push, get } from "firebase/database";
import { hash } from "crypto";
import jwt from 'jsonwebtoken';
import { secret_key } from "@config/environment";

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
    const req_body : RequestBody = await request.json()
    const userRef = ref(realtimeDb, 'users/')


    const snapshot = await get(userRef)

    let user : any | undefined = undefined

    if (snapshot.exists()) {
        const users = snapshot.val() as { [key:string] : User };

        user = Object.entries(users).find(([key, userData]) => {
            return userData.username === req_body.username && userData.password === req_body.password
        })

        if (user){
            user = {
                userId : user[0],
            ...(user[1] && typeof user[1] == 'object' ? user[1] : {})
            }
        }
    }


    const token = await jwt.sign({
        id : user.userId,
        username : user.username
    }, secret_key, {
        expiresIn : "1d"
    })

    return NextResponse.json({
        data: token
    })
}
