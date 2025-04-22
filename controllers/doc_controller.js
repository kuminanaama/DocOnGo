import jwt from "jsonwebtoken";
import { DoctorModel } from "../models/doctor.js";
import {
  loginDoctorValidator,
  registerDoctorValidator,responseValidator
} from "../validators/docvalidators.js";
import crypto from "crypto";
import { senderVerificationEmail } from "../utils/mailings.js";
import bcrypt from "bcrypt";
import { PostModel } from "../models/post.js";
import { ResponseModel } from "../models/response.js";

//register user
export const registerDoctor = async (req, res, next) => {
  //validate user info
  try {
    const { error, value } = registerDoctorValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    // check if user exists
    const user = await DoctorModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (user) {
      return res.status(409).json("Doctor already exists");
    }

    //Hash Password
    const hashedpassword = bcrypt.hashSync(value.password, 10);
    const verificationCode = crypto.randomBytes(3).toString("hex");

    const newUser = await DoctorModel.create({
      ...value,
      password: hashedpassword,
      verificationCode: verificationCode,
      verified: false,
    });

    await senderVerificationEmail(
      value.email,
      verificationCode,
      newUser.username
    );

    return res
      .status(201)
      .json({ message: `Welcome ${value.username} to DocOnGo`, newUser });
  } catch (error) {
    next(error);
  }
};
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await DoctorModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid Verification Code" });
    }

    user.verified = true;
    await user.save();

    const accessToken = jwt.sign({ id: user.id,role : "doctor",
      specialty: user.specialty
     }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Email Verified Successfully",
      accessToken,
      user: { id: user.id },
    });
  } catch (error) {
    next(error);
  }
};

//User login
export const loginDoctor = async (req, res, next) => {
  //validate user info
  const { error, value } = loginDoctorValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //find matching user record in database
  console.log("value", value)
  
  const user = await DoctorModel.findOne({
    email: value.email
  });
  
  console.log(user)
  if (!user || !(await user.comparePassword(value.password))) {
    console.log("user exist");
    return res.status(404).json("Invalid credentials");
  }
  
  //generate access token for user
  const accessToken = jwt.sign({ id: user.id,role : "doctor",
    specialty: user.specialty }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  //return response
  res.status(200).json({ accessToken });
};




//Get all request for a particualar doc
 export const getMyRequests = async (req, res,next) => {
  try {
    if (!req.auth ||!req.auth.specialty){
      return res.status (400).json({message:'Missing doctor specailty'})
    }
    const doctorSpecialty = req.auth.specialty;

    const request= await PostModel.find({specialty:doctorSpecialty});

    res.status(200).json({
      message: "All requests", request
     });
  
  } catch (error) {
    next(error)
  }
 };

 //Get single request if it matches doctors specailization
 export const getSingleRequestById = async (req,res,next) => {
 try {
   const{id} = req.params
 
   const request = await PostModel.findById (id) 
   
   res.status(200).json(request);
 } catch (error) {
  next (error)
  
 }
 };


 //Update the status of a request
 export const updateRequestById = async (req,res,next) =>{
     
  try {
    const {id} = req.params;
  
    const {status} = req.body;
  
    const doctorSpecialty = req.auth.specialty;
  
    const doctorId = req.auth.id;
  
    const request  = await PostModel.findOneAndUpdate({
      id:id,
      specialty : doctorSpecialty },{status,assignedDoctor : doctorId}, {new:true}
  );
  res.status(200).json(request);
  } catch (error) {
    next(error)
  }

 };


//Respond to patient request
 
export const createResponse = async (req,res,next) => {
   try {
    const { error } = responseValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }


    const {requestId} = req.params;
 
    const  {diagnosis,prescription,referral ,referral_reason} = req.body
 
    const doctorId= req.auth.id;

    const userRole = req.auth.role;

   // Make sure user is a doctor
    if (userRole !== 'doctor'){
      return res.status (403).json({message:'Doctors only!!!'})
    }

    //Check if requests exists
  const request = await PostModel.findById(requestId);
  if(!request){
   return res.status(404).json({mesage:'Request not found'})
 
  };

  // Add image for prescription
  const image = req.file ? req.file.path : null;


// Prevent duplicate response from the same doctor
const existingResponse = await ResponseModel.findOne({
  request:requestId,
  doctor:doctorId
});

if (existingResponse) {
  return res.status(409).json({ message: 'You have already responded to this request' });
}


    //Create response 
    const response = await ResponseModel.create({request :requestId, doctor:doctorId ,diagnosis,prescription,referral, referral_reason,image},
      
 );
 
 //Update the status and assigned doctor on the request
 request.status = "responded";
 request.assignedDoctor = doctorId;
 await request.save();
 
 res.status(200).json({message: "Response added successfully",response});
 
   } catch (error) {
    next(error);
   }

}
