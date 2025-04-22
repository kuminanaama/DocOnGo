import {Schema ,model,Types} from "mongoose";


const responseSchema = new Schema({
    request: {
    type: Types.ObjectId,
    ref: 'post',
    required: true
    },
    doctor: {
        type:Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
        diagnosis: {
        type: String,
        required: true
     },

     prescription :[{
        medication: {
            type:String
         },
        dosage : {
            type:String,

        },
        duration: {
            type: String
        }
     }],

     image: {
        type: String,
      },

    referral:{
        type:String
    },
    
    referral_reason :{
        type:String
},


    },{timestamps:true
});

export const ResponseModel = model('Response',responseSchema)