import { Schema, model, Types } from "mongoose";
import { compare } from "bcrypt";

const DoctorSchema = new Schema({
  username : {type: String , required : true, unique : true},
  email :{type : String,  required :true , unique:true},
  password :{ type: String , required: true},
  specialty: {type: String, enum: ['General Physician', 'Public Health','Paediatrician','Gynaecologist']},
  verificationCode : { type:String },
  verified: {type:Boolean , default: false}
  
},{timestamps:true,
  methods :{
    async comparePassword(password) {
      return await compare (password, this.password)
    },
  },
})
export const DoctorModel = model ('Doctor',DoctorSchema)