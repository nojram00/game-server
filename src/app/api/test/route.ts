import { NextRequest, NextResponse } from "next/server";
import { realtimeDb } from "@config/firebase.config";
import { ref, set, onValue, push } from "firebase/database";
import { randomInt } from "crypto";

export async function GET(request : NextRequest){

    const userRef = ref(realtimeDb, 'users/');
    var data: any = [];

    onValue(userRef, (snapshot) => {
        var users = snapshot.val()

        Object.entries(users).forEach(([userId, userData]) => {
            data.push({
                userId : userId,
                ...(userData && typeof userData == 'object' ? userData : {})
            })
        });
    })

    return NextResponse.json({
        message : "Hello",
        users: data
    })
}


export async function POST(request : NextRequest){

    const request_body = await request.json()
    const userRef = ref(realtimeDb, 'users')
    const newRef = push(userRef)
    set(newRef, {
        username : request_body.username,
        password : request_body.password
    })

    return NextResponse.json({
        message: "User Created!",
        userId : newRef.key
    })
}
