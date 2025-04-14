import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PatientModel } from "../models/patient.js";
import { loginPatientValidator, registerPatientValidator } from "../validators/patientvalidators.js";

//register user
export const registerPatient = async (req,res,next) =>{
    //validate user info
    try {
        const {error , value} = registerPatientValidator.validate(req.body);
        if (error) {
            return res.status (422).json (error);
        }
    
    // check if user exists
    const user = await PatientModel.findOne({
        $or:[
            {username: value.username },
            {email : value.email}
        ]
    });
     if (user) {
        return res.status(409).json('Patient already exists')
     }
    
    //Hash Password
     const hashedpassword = bcrypt.hashSync(value.password,10)
    const newUser = await PatientModel.create({
         ...value,
         password : hashedpassword
    })
     return res.status(201).json({message: `Welcome ${value.username} to DocOnGo`, newUser})
    
    } catch (error) {
        next (error);
        
    }
}
 
//User login
export const loginPatient = async (req,res,next) =>{
    //validate user info
    const {error,value} = loginPatientValidator.validate(req.body);
if (error){
return res.status(422).json(error);
}
    //find matching user record in database
    const user = await PatientModel.findOne({

        $or:[
            {username:value.username},
            {email:value.email}
        ]
    });
    if (!user){
        return res.status(404).json('Patient does not exist!');
    }
    //compare incoming password with saved password
const correctPassword = bcrypt.compareSync(value.password,user.password);
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