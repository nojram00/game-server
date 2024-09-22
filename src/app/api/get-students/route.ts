import { db, getStudents } from "@main/models_v2/drizzle";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    const page = req.nextUrl.searchParams.get('page') as string ?? "1"
    try
    {
        // const students = await StudentModel.getAll()
        const pageSize = 5

        const students = await db.query.Student.findMany({
            columns : {
                password : false
            },
            with : {
                section : {
                    columns : {
                        id : false,
                        teacherId : false
                    }
                },
                progress : {
                    columns : {
                        id : false
                    }
                },
                score : {
                    columns : {
                        id : false
                    }
                }
            },
            limit : pageSize,
            offset : ((Number(page) - 1) * pageSize)
        })

        if (students){

            return NextResponse.json(students, { status : 200 })
        }

    }
    catch(err)
    {
        return NextResponse.json({
            message : `Error: ${err}`
        }, {status : 500})
    }
}
