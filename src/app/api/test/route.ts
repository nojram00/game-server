import { NextRequest, NextResponse } from "next/server";
import { realtimeDb } from "@config/firebase.config";
import { ref, set, onValue, push } from "firebase/database";
import { randomInt } from "crypto";
import { Teacher } from "@main/types/types";
import { TeacherModel } from "@main/models/teacher";

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

    const request_body = await request.json() as Teacher
    const teacherData = new TeacherModel(request_body)

    const res = await teacherData.save()

    return NextResponse.json({
        message: "User Created!",
        userId : teacherData.teacher.userId
    })
}
