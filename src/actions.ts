// Form Actions
'use server'

import { realtimeDb } from "@config/firebase.config";
import { equalTo, get, query, ref } from "firebase/database";
import jwt from 'jsonwebtoken'
import { generateSecret, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { secret_key } from "./config/environment";
import { request } from "http";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signin(formdata: FormData){
    try
    {
        const username = formdata.get('username');
        const password = formdata.get('password');
        const userRef = ref(realtimeDb, 'users/');

        const snapshot = await get(userRef)

        if (snapshot.exists()) {
            let users : any = []
            snapshot.forEach(user => {
                users.push({
                    userid : user.key,
                    ...(user.val())
                })
            });

            const user = users.find((u : any) => {
                return u.username === username && u.password === password
            })

            if (user) {

                if (user.role === 1){
                    redirect('/');
                    return
                }

                const token = jwt.sign({
                    id : user.userId,
                    username: user.username,
                    role: user.role
                }, secret_key, {
                    expiresIn : '1d'
                })


                // const secret = await createSecretKey(secret_key)

                // const token = await new SignJWT({
                //     id: user.userId,
                //     username : user.username,
                //     role : user.role
                // }).setProtectedHeader({ alg : 'HS256'})
                // .setExpirationTime('1d')
                // .sign(secret)
                // const response = NextResponse.json({
                //     message: "Login Success!"
                // }, {
                //     status: 200
                // })

                // response.cookies.set('token', token, {
                    // httpOnly: true,
                    // maxAge: 60 * 60,
                    // path: '/',
                    // sameSite: 'lax',
                    // secure: process.env.NODE_ENV === 'production',
                // })
                cookies().set('token', token, {
                    httpOnly: true,
                    maxAge: 60 * 60,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                })
            }
        }

    }
    catch(err){
        console.error(err)
    }
    finally{
        redirect('/dashboard')
    }

}

export async function signOut(){
    cookies().delete('token')
    redirect('/')
}
