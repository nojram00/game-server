import { NextRequest, NextResponse } from "next/server";
import { realtimeDb } from "@config/firebase.config";
import { ref, set, onValue, push, get } from "firebase/database";
import { User } from "@main/types/types";

export async function GET(request : NextRequest){

    const userRef = ref(realtimeDb, 'users/');
    var data: Array<User> = [];

    const snapshot = await get(userRef)

    snapshot.forEach((s) => {
        data.push({
            userId : s.key,
            ...s.val()
        })
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
        password : request_body.password,
        role: 1 // Set role to student
    })

    return NextResponse.json({
        message: "User Created!",
        userId : newRef.key
    })
}
