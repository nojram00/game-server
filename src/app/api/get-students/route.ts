import StudentModel from "@main/models/student";
import { db } from "@main/models_v2/drizzle";
// import { Student } from "@main/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try
    {
        // const students = await StudentModel.getAll()
        const students = await db.query.Student.findMany({
            columns : {
                password : false
            },
            with : {
                score : {
                    columns : {
                        id : false
                    }
                },
                progress : {
                    columns : {
                        id : false
                    }
                },
                section : {
                    columns : {
                        id : false,
                        teacherId : false,
                    },
                    with : {
                        teacher : {
                            columns : {
                                name: true,
                                username : true
                            }
                        }
                    }
                }
            }
        })

        if (students){

            return NextResponse.json({
                data : students
            }, { status : 200 })
        }

    }
    catch(err)
    {
        return NextResponse.json({
            message : `Error: ${err}`
        }, {status : 500})
    }
}
