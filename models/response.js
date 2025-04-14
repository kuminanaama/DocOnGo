import {Schema ,model,Types} from "mongoose";


const responseSchema = new Schema({
    post: {
    type: Types.ObjectId,
    ref: 'Post',
    required: true
    },
    doctor: {
        type:Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
        content: {
        type: String,
        required: true
     },

     prescription :{
        type:String
     }

    },{timestamps:true
});

export const ResponseModel = model('Response',responseSchema)