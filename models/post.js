import { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
  patient: {
    type: Types.ObjectId,
    ref: "Patient",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "responded"],
    default: "pending",
  },

  assignedDoctor: {
    type: Types.ObjectId,
    ref: 'Doctor'
    },

},{ timestamps:true 

});

export const PostModel = model('Post',postSchema)
