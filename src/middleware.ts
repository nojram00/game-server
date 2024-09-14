import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { secret_key } from "./config/environment"
import { getSession } from "./libs/Session";


const protected_routes : Array<string> = [
    '/dashboard',
    '/scores',
    '/progress',
    '/add-teacher'
]

const admin_only : Array<string> = [
    '/add-teacher'
]

export async function middleware(req : NextRequest){

    const session = await getSession()
    // Guest
    if(req.nextUrl.pathname === "/"){
        if (session){
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }

    // Auth
    if (protected_routes.includes(req.nextUrl.pathname)){
        try
        {
            if(session){
                return NextResponse.next()
            }

            return NextResponse.redirect(new URL("/", req.url))
        }
        catch(err){
            console.error(err)
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    // Check Admin Only site
    if(admin_only.includes(req.nextUrl.pathname)){

        if(session === null){
            return NextResponse.redirect(new URL("/", req.url))
        }

        if(session){
            if (Boolean(session.isAdmin)){
               return NextResponse.next()
            }
        }

    }

    return NextResponse.next()
}


export const config = {
    matcher : [
        '/',
        '/dashboard',
        '/scores',
        '/progress',
        '/add-teacher'
    ]
}
