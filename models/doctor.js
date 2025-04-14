import { Schema, model, Types } from "mongoose";

const DoctorSchema = new Schema({
  username : {type: String , required : true, unique : true},
  email :{type : String,  required :true , unique:true},
  password :{ type: String , required: true},
  specialty: {type: String, enum: ['General Physician', 'Public Health','Paediatrician','Gynaecologist']},
  verificationCode : { type:String },
  verified: {type:Boolean , default: false}
})
export const DoctorModel = model ('Doctor',DoctorSchema)