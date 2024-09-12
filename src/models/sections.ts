import { Section, Student, Teacher } from "@main/types/types";
import Base from "./base";
import { get, push, set, update } from "firebase/database";

export default class SectionModel {
    constructor(public section : Section){

    }

    async getData() : Promise<Section>{
        this.section.students = await this.getStudents()
        this.section.teacher = await this.getTeacher()
        return this.section
    }

    async getTeacher() : Promise<Teacher | null>{
        try
        {
            const teacherRef = Base.getReference(`teachers/${this.section.teacherId}`)

            const snapshot = await get(teacherRef)

            let data : Teacher | null = null
            if(snapshot.exists()){
                data = {
                    userId : snapshot.key,
                    ...snapshot.val()
                }
            }

            return data
        }
        catch(err)
        {
            return null
        }
    }

    async getStudents() : Promise<Array<Student> | null>{
        try
        {
            const studentRef = Base.getReference('students')

            let data : Array<Student> = []
            const snapshot = await get(studentRef)
            if(snapshot.exists())
            {
                snapshot.forEach((s) => {
                    if(typeof s.val().sectionId !== "undefined"){
                        data.push({
                            studentId : s.key,
                            ...s.val()
                        })
                    }
                })
            }

            if(data.length > 0)
            {
                const filtered = data.filter((d) => d.sectionId === this.section.sectionId)

                return filtered
            }

            return null
        }
        catch (err)
        {
            return null
        }
    }

    async save() : Promise<Section | null>{
        try
        {
            const sectionRef = Base.getReference('sections')
            const newRef = push(sectionRef)

            await set(newRef,  { ...this.section })

            this.section.sectionId = newRef.key

            return {
                ...this.section
            }
        }
        catch (err) {
            return null
        }
    }

    static async getAll() : Promise<Array<Section> | null> {
        try {

            const secRef = Base.getReference('sections')

            const snapshot = await get(secRef)

            let data : Array<Section> = []
            if(snapshot.exists()){
                snapshot.forEach((s) => {
                    data.push({
                        sectionId : s.key,
                        ...s.val()
                    })
                })
            }

            return data

        } catch (error) {
            return null
        }
    }

    static async find(sectionId : string) : Promise<SectionModel | null> {
        try {

            const secRef = Base.getReference(`sections/${sectionId}`)

            const snapshot = await get(secRef)

            let data : Section | null = null

            if(snapshot.exists()){
                data = {
                    sectionId : snapshot.key,
                    ...snapshot.val()
                }
            }

            if (data){
                return new SectionModel(data)
            }

            return null


        } catch (error) {
            return null
        }
    }

    async addStudent(studentId : string) : Promise<Student | null> {
        try
        {
            const studentRef = Base.getReference(`students/${studentId}`)

            await update(studentRef, { studentId : this.getData().sectionId, section : this.getData() })

            const snapshot = await get(studentRef)

            let data : Student | null = null

            if (snapshot.exists()) {
                data = {
                    ...snapshot.val()
                }
            }

            return data
        }
        catch(err){
            return null
        }
    }
}
