import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DoctorModel } from "../models/doctor.js";
import { loginDoctorValidator, registerDoctorValidator } from "../validators/docvalidators.js";
import crypto from "crypto"
import { senderVerificationEmail } from "../utils/mailings.js";

//register user
export const registerDoctor = async (req,res,next) =>{
    //validate user info
    try {
        const {error , value} = registerDoctorValidator.validate(req.body);
        if (error) {
            return res.status (422).json (error);
        }
    
    // check if user exists
    const user = await DoctorModel.findOne({
        $or:[
            {username: value.username },
            {email : value.email}
        ]
    });
     if (user) {
        return res.status(409).json('Doctor already exists')
     }
    
    //Hash Password
     const hashedpassword = bcrypt.hashSync(value.password,10)
const verificationCode = crypto.randomBytes(3).toString("hex");

    const newUser = await DoctorModel.create({
         ...value,
         password : hashedpassword,
         verificationCode:verificationCode,
         verified:false,
    });

    await senderVerificationEmail (value.email,verificationCode, newUser.username);

     return res.status(201).json({message: `Welcome ${value.username} to DocOnGo`, newUser})
    
    } catch (error) {
        next (error);
        
    }
}
 export const verifyEmail = async (req, res, next) => {
    try {
        const {email, verificationCode} = req.body;
    
        const user = await DoctorModel.findOne({email})
        if(!user ){
            return res.status(404).json({message: "Email not found"});
        }
    
        if(user.verificationCode !== verificationCode) {
            return res.status(400).json({message: "Invalid Verification Code"})
        }
    
        user.verified = true;
        await user.save();
    
        const accessToken = jwt.sign({ id: user.id}, process.env.JWT_SECRET_KEY,{expiresIn: "24h"});
    
        return res.status(200).json({
            message: "Email Verified Successfully",
            accessToken,
            user: {id: user.id}
        })
    } catch (error) {
        next(error)
    }
 }

 
//User login
export const loginDoctor = async (req,res,next) =>{
    //validate user info
    const {error,value} = loginDoctorValidator.validate(req.body);
if (error){
return res.status(422).json(error);
}
    //find matching user record in database
    const user = await DoctorModel.findOne({

        $or:[
            {username:value.username},
            {email:value.email}
        ]
    });
    if (!user){
        return res.status(404).json('Doctor does not exist!');
    }
    //compare incoming password with saved password
const correctPassword = bcrypt.compare(value.password,user.password);
if(!correctPassword) {
    return res.status(401).json('Invalid credentials!')
}
 //generate access token for user
 const accessToken = jwt.sign(
    {id:user.id},
    process.env.JWT_SECRET_KEY,
    {expiresIn:  '24h'}
)
 //return response
 res.status(200).json({accessToken});
}