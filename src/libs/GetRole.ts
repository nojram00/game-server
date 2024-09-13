import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { secret_key } from "@config/environment"
import { cookies } from "next/headers";

const verifyToken = async (token : string, secret_key : string) : Promise<any> => {
    try{
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret_key));
        return payload;
    }
    catch(error){
        throw new Error('Token Verification Failed');
    }
}
export default async function isAdmin() : Promise<boolean> {
    const token_cookie = cookies().get('token')

    if(token_cookie){
        const token_value = token_cookie?.value

        const decoded = await verifyToken(token_value, secret_key)
        if(decoded && decoded.isAdmin){
            return true
        }
    }

    return false
}
