import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { secret_key } from "./config/environment"

const verifyToken = async (token : string, secret_key : string) : Promise<any> => {
    try{
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret_key));
        return payload;
    }
    catch(error){
        throw new Error('Token Verification Failed');
    }
}


const protected_routes : Array<String> = [
    '/dashboard',
    '/scores',
    '/progress'
]

export async function middleware(req : NextRequest){

    // Guest
    if(req.nextUrl.pathname === "/"){
        console.log("Home")

        const token = req.cookies.get('token')
        if(token){
            const dec = await verifyToken(token.value, secret_key)

            if (dec){
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
        }
    }

    // Auth
    if (protected_routes.includes(req.nextUrl.pathname)){
        try
        {
            const cookies = req.cookies

            const token_cookie = cookies.get('token')?.value

            if(!token_cookie){
                return NextResponse.redirect(new URL("/", req.url))
            }

            const decoded = await verifyToken((typeof token_cookie == 'string' ? token_cookie : ""), secret_key)

            if(decoded){
                if (decoded.role === 1){
                    req.cookies.delete('token')
                    return NextResponse.redirect(new URL("/", req.url))
                }

                return NextResponse.next()
            }

            return NextResponse.redirect(new URL("/", req.url))
        }
        catch(err){
            console.error(err)
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.next()
}


export const config = {
    matcher : [
        '/',
        '/dashboard',
        '/scores',
        '/progress'
    ]
}
