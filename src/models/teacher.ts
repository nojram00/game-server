import { Section, Teacher } from "@main/types/types";
import Base from "./base";
import { push, ref, set, get, update } from "firebase/database";

export class TeacherModel {
    constructor(public  teacher : Teacher) {}

    getData() : Teacher{
        return this.teacher
    }

    async save() : Promise<Teacher | null> {
        try
        {
            const teacherRef = Base.getReference('teachers')

            const newRef = push(teacherRef)

            await set(newRef, { ...this.teacher })


            this.teacher.userId = newRef.key

            return {
                ...this.teacher
            }

        }
        catch(err)
        {
            return null
        }
    }

    static async getAll() : Promise<Array<Teacher> | Array<Object>> {
        try
        {
            const teacherRef = ref(Base.database, 'teachers')

            const snapshot = await get(teacherRef)

            let data : Array<Teacher> = []

            if (snapshot.exists()){
                snapshot.forEach((s) => {
                    data.push({
                        userId : s.key,
                        ...s.val()
                    })
                })
            }

            return data;
        }
        catch
        {
            return []
        }
    }

    static async find(userId : string) : Promise<TeacherModel | null> {
        try {
            const teacherRef = Base.getReference(`teachers/${userId}`)

            var snapshot = await get(teacherRef)

            let data : Teacher | undefined

            if (snapshot.exists()) {
                data = {
                    userId : teacherRef.key,
                    ...snapshot.val()
                }
            }

            if(typeof data !== 'undefined'){
                const res = new TeacherModel(data)
                return res
            }

            return null

        }
        catch(err){
            console.error(err)
            return null
        }
    }

    async UpdateSection(section : Section) : Promise<Teacher | null>{
        try {
            const sectionRef = Base.getReference(`sections/${section.sectionId}`)
            if(typeof this.teacher !== 'undefined')
            {
                if(this.teacher.userId){
                    await update(sectionRef, {teacherId : this.teacher.userId})
                    const data =  await TeacherModel.find(this.teacher.userId)

                    if(data){
                       return data.getData()
                    }
                }
            }

            return null
        }

        catch(err)
        {
            return null
        }
    }
}
