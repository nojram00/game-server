import { secret_key } from "@main/config/environment";
import { jwtDecrypt, JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export async function setSession(user : any){

    const d = new Date()
    const expiration =  new Date(d.getFullYear(),
                                ((d.getMonth() + 1) > 11 ?
                                ((d.getMonth() + 1) % 12) :
                                d.getMonth() + 1) ,
                                d.getDate())
    const token = await new SignJWT({
        id : user.id,
        username : user.username,
        isAdmin : user.isAdmin
    })
        .setExpirationTime(expiration)
        .sign(new TextEncoder().encode(secret_key))

    cookies().set("token", token, {
        httpOnly: true,
                expires : expiration,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
    })
}

export async function getSession() {
    const token = cookies().get('token')
    if(token){

        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret_key))

        return payload

    }
    return null
}

export async function isAdmin() : Promise<boolean> {
    const session = await getSession()
    if(session && Boolean(session.isAdmin)){
        return true
    }

    return false
}
