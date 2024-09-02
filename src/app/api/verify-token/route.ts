
import { secret_key } from '@config/environment'
import jwt from 'jsonwebtoken'
import { NextResponse, NextRequest } from 'next/server'

const verifyToken = (token : string, secret_key : string) : Promise<any> => {
    return new Promise((res, rej) => {
        jwt.verify(token, secret_key, (err : any, dec : any) => {
            if (err){
                rej(err)
            }
            else{
                res(dec)
            }
        })
    })
}

export async function POST(req: NextRequest){

    try
    {
        const req_body = await req.json()
        const decoded = await verifyToken(req_body.token, secret_key)
        const uid = decoded.id

        return NextResponse.json({
            userId : uid
        }, { status: 200 });
    }
    catch(err){
        console.error(`Invalid Token! ${err}`)

        return NextResponse.json({
            message: `Invalid Token! ${err}`
        }, { status: 500 })
    }

}
