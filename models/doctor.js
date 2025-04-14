import { Schema, model, Types } from "mongoose";

const DoctorSchema = new Schema({
  username : {type: String , required : true, unique : true},
  email :{type : String,  required :true , unique:true},
  password :{ type: String , required: true},
  specialty: {type: String, enum: ['General Physician', 'Public Health','Paediatrician','Gynaecologist']},
})
export const DoctorModel = model ('Doctor',DoctorSchema)