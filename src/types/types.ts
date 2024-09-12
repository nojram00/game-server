import { realtimeDb } from "@main/config/firebase.config";
import { child, get, push, ref, set, update } from "firebase/database";

export interface User{
    username : string;
    password : string;
    name : string;
    sectionId? : string;
}

export interface Student extends User {
    studentId? : string | null;
    score? : Score;
    progress? : Progress;
    section? : Section;
}

export interface Teacher extends User {
    userId? : string | null
    isAdmin : boolean
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
    teacherId? : string | null
    teacher? : Teacher | null
    students? : Array<User> | null
}
