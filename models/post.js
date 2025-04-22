
import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
  {
    patient: {
      type: Types.ObjectId,
      ref: "Patient",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    specialty: {
      type: String,
      enum: ["General Physician", "Public Health","Pediatrician", "Gynaecologist"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "responded"],
      default: "pending",
    },

    assignedDoctor: {
      type: Types.ObjectId,
      ref: "Doctor",
    },

    location:{
      type:String
    },
    
    followUpContact:{
      type : String,
    },





  },
  { timestamps: true }
);

export const PostModel = model("Post", postSchema);
