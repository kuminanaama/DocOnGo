import {Schema,model} from "mongoose";


const PatientSchema = new Schema ({
    username : {type:String , required : true, unique : true},
    email :{type : String,  required :true , unique:true},
    password :{ type: String , required: true}


},{timestamps : true

}) 



export const PatientModel = model ('Patient', PatientSchema)