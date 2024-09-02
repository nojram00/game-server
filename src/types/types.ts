import { realtimeDb } from "@main/config/firebase.config";
import { child, get, push, ref, set, update } from "firebase/database";

export interface User{
    userId? : string | null;
    username? : string;
    password? : string;
    name? : string;
    role?: number;
    score? : Score;
    progress? : Progress;
    sectionId? : string;
}

export interface Score{
    post_test : number;
    pre_test: number;
}

export interface Progress{
    quantum_mastery : number;
    ecology_mastery : number;
    momentum_mastery : number;
    tera_mastery : number;
}

export interface Section{
    sectionId?: string | null
    sectionName? : string
    teacher? : User | null
    students? : Array<User> | null
}


// Modelssssssssssssssssssssss //

export class SectionModel {
    constructor(
        public sectionName: string,
        public teacher : string,
        public students : Array<User>){}

    async get_json() {

        const _teacher : User | null = await UserModel.find(this.teacher);

        return {
            sectionName : this.sectionName,
            teacher : _teacher || null,
            students : this.students || null
        }
    }

    async save() : Promise<Section | null> {

        try{
            const sectionRef = ref(realtimeDb, 'sections')
            const newRef = push(sectionRef)

            const data = await this.get_json()
            set(newRef, {
                ...data
            })

            return {
                sectionId : newRef.key,
                ...data
            }
        }
        catch(err){
            // console.error(err)
            return null
        }
    }

    static async find(id : string) : Promise<Section | null> {
        const data = await SectionModel.retrieveAll()

        const filtered_data = data.find((d) => d.sectionId === id)

        if(typeof filtered_data === 'undefined'){
            return null
        }

        return filtered_data

    }
    static async retrieveAll() : Promise<Array<Section>> {
        const sectionRef = ref(realtimeDb, 'sections')

        const snapshot = await get(sectionRef)

        let data : Array<Section> = []

        if (snapshot.exists()){
            snapshot.forEach((s) => {
                data.push({
                    sectionId : s.key,
                    ...s.val()
                })
            })
        }

        if(typeof data === 'undefined'){
            return []
        }
        return data;
    }

    static async getStudentsBySecId(sectionId : string) : Promise<Array<User | null> | null>{
        const users = await UserModel.retrieveAll()

        if(users){

            const filtered_data : Array<User | null> = users.filter((user) => user?.sectionId === sectionId)

            return filtered_data
        }


        return null

    }
}


export class UserModel {
    constructor(
        public username : string,
        public password : string,
        public name : string,
        public role : number,
    ){

    }
    save() : User | null{
        try{
            const userRef = ref(realtimeDb, 'users')

            const newUser = push(userRef)

            const data = {
                username : this.username,
                password : this.password,
                name : this.name,
                role : this.role
            }

            set(newUser, data)

            return {
                userId : newUser.key || null,
                ...data
            }

        }
        catch(err){
            return null
        }
    }

    static async find(id : string) : Promise<User | null> {
        const userRef = ref(realtimeDb, 'users')

        const snapshot = await get(userRef)

        let data : Array<User> = []

        snapshot.forEach((s) => {
            data.push({
                userId : s.key,
                ...s.val()
            })
        })

        const filtered_data : User | undefined = data.find((d) => d.userId === id)

        if(typeof filtered_data !== 'undefined'){
            return filtered_data
        }
        else{
            return null
        }
    }

    static async retrieveAll() : Promise<Array<User | null>> {
        const userRef = ref(realtimeDb, 'users')

        const snapshot = await get(userRef)

        let data : Array<User> = []

        snapshot.forEach((s) => {
            data.push({
                userId : s.key,
                ...s.val()
            })
        })

        if (typeof data === 'undefined'){
            return []
        }

        return data
    }

    static async addSection(id : string, sectionId : string) : Promise<boolean> {
        const user = await UserModel.find(id);
        const section = await SectionModel.find(sectionId);

        if(user){
            const userRef = ref(realtimeDb, `users/${id}`)
            if (section){
                update(userRef, {
                    sectionId : section.sectionId
                })

                return true
            }
        }

        return false
    }

    static async updateScore(userId : string, scoreData : Score) : Promise<boolean>{
        try
        {
            const userRef = ref(realtimeDb, `users/${userId}`)

            update(userRef, { score : scoreData })

            return true
        }
        catch (err)
        {
            return false
        }
    }

    static async updateProgress(userId : string, progress : Progress) : Promise<boolean>{
        try
        {
            const userRef = ref(realtimeDb, `users/${userId}`)

            update(userRef, { progress : progress })

            return true;
        }

        catch(err)
        {
            return false;
        }
    }
}
