import { realtimeDb } from "@main/config/firebase.config";
import { UserModel, User } from "@main/types/types";
import { equalTo, get, query, ref } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try
    {
        const users = await UserModel.retrieveAll()

        if (users){
            const students : Array<User> | any = users.filter((s : any) => s.role === 1)

            if (students.length <= 0){
                return NextResponse.json({
                    messsage: "No students found..."
                }, {status : 400})
            }

            return NextResponse.json({
                data : students
            })
        }

    }
    catch(err)
    {
        return NextResponse.json({
            message : `Error: ${err}`
        }, {status : 500})
    }
}
