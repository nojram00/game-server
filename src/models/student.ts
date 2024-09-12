import { realtimeDb } from "@main/config/firebase.config";
import Base from "./base";
import { get, push, ref, set, update } from "firebase/database";
import { Progress, Score, Section, Student } from "@main/types/types";
import SectionModel from "./sections";

export default class StudentModel {

    constructor(public student : Student){

    }

    getData() : Student {
        return this.student
    }

    async save() : Promise<Student | null> {
        try
        {
            const studentRef = Base.getReference('students')

            const newRef = push(studentRef)

            await set(newRef, { ...this.student })


            this.student.studentId = newRef.key

            return {
                ...this.student
            }

        }
        catch(err)
        {
            return null
        }
    }

    static async getAll() : Promise<Array<Student> | null> {
        try
        {
            const studentRef = ref(Base.database, 'students')

            const snapshot = await get(studentRef)

            let data : Array<Student> = []

            if (snapshot.exists()){
                snapshot.forEach((s) => {
                    data.push({
                        studentId : s.key,
                        section: SectionModel.find(s.val().studentId),
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
    static async find(studentId : string) : Promise<StudentModel | null> {
        try {
            const studentRef = Base.getReference(`students/${studentId}`)

            var snapshot = await get(studentRef)

            let data : Student | undefined

            if (snapshot.exists()) {
                data = {
                    studentId : studentRef.key,
                    ...snapshot.val()
                }
            }

            if(typeof data !== 'undefined'){
                const res = new StudentModel(data)
                return res
            }

            return null

        }
        catch(err){
            console.error(err)
            return null
        }
    }

    async updateScore(score : Score) : Promise<Student | null> {
        try {

            if(typeof this.student.studentId === 'string'){
                const studentRef = Base.getReference(`students/${this.student.studentId}`)
                await update(studentRef, { score : score })

                const data =  await StudentModel.find(this.student.studentId)

                if(data){
                    console.log('Data after update:', data);
                    return data.getData()
                }
            }

            return null
        }

        catch(err)
        {
            console.error(err)
            return null
        }
    }

    async UpdateProgress(progress : Progress) : Promise<Student | null> {
        try {
            if(typeof this.student.studentId === 'string'){
                const studentRef = Base.getReference(`students/${this.student.studentId}`)
                await update(studentRef, { progress : progress })

                const data =  await StudentModel.find(this.student.studentId)

                if(data){
                   return data.getData()
                }

            }

            return null
        }

        catch(err)
        {
            return null
        }
    }

    async UpdateSection(section : Section) : Promise<Student | null>{
        try {
            if(typeof this.student.studentId === 'string'){
                const studentRef = Base.getReference(`students/${this.student.studentId}`)
                await update(studentRef, { sectionId : section.sectionId, section : section })

                const data =  await StudentModel.find(this.student.studentId)

                if(data){
                   return data.getData()
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
