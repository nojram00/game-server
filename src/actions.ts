// Form Actions
'use server'
import jwt from 'jsonwebtoken'
import { generateSecret, SignJWT } from "jose";
import { secret_key } from "./config/environment";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { changePassword, createSection, createTeacher, getAdmin, getStudent, getTeacher } from "./models_v2/drizzle";
import { comparePass, hashPassword } from "./libs/PasswordGenerator";
import { setSession } from './libs/Session';
import { revalidatePath } from 'next/cache';
import { isNumberObject } from 'util/types';

export async function signin(formdata: FormData){
    try
    {
        const username = formdata.get('username');
        const password = formdata.get('password');

        const user = await getTeacher((username as string))

        // await setSession(user[0])
        console.log(comparePass(password as string, user[0].password))
        console.log(user[0])
        if (comparePass(password as string, user[0].password)) {
               await setSession(user[0])
               console.log("Success")
            }

        }
        catch(err){
            console.error(err)
            revalidatePath('/')
        }

        redirect('/dashboard')

    }


export async function signOut(){
    cookies().delete('token')
    redirect('/')
}

export async function addTeacher(formdata : FormData) {
    try
    {
        const username = formdata.get('username')
        const password = formdata.get('password')
        const name = formdata.get('name')
        const section = formdata.get('section')

        console.log(section)

       const res = await createTeacher({
           name: (name as string),
           username: (username as string),
           password: (hashPassword(password as string))
       }, (isNaN(Number(section)) ? 0 : Number(section)))

       console.log(res)
    }
    catch(err)
    {
        console.error(err)
    }

    revalidatePath('/add-teacher')
}

export async function AddClassData(formdata : FormData) {
    try{
        const section_name = formdata.get('name')
        const teacher = formdata.get('teacher_id')

        const save = await createSection(Number(teacher), (section_name as string))

        if (save.length > 0){
            console.log("Created!")
            redirect('/classes')
        }
    }
    catch(err)
    {
        console.error(err)
    }
}

export async function changeInfo(formdata : FormData) {
    const password = formdata.get('password')
    const confirm_password = formdata.get('confirm_password')
    const new_password = formdata.get('new_password')

    if(password === confirm_password){
       const result = await changePassword(hashPassword(new_password as string), password as string)

       if (result.length > 0){
        console.log("password changed: ", result)
        revalidatePath('/account-settings')
       }
    }
}

// username : admin02
// pass : adminpass002
