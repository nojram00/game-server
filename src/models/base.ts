import { realtimeDb } from "@main/config/firebase.config";
import { ref } from "firebase/database";

class Base {

    static database = realtimeDb
    name : string = ""

    static getReference(path : string){
        return ref(this.database, path)
    }
}


export default Base
