import {Router} from "express";
import { loginDoctor, registerDoctor } from "../controllers/doc_controller.js";


const DoctorRouter = Router();

DoctorRouter.post('/doctor/register', registerDoctor);
DoctorRouter.post('/doctor/login',  loginDoctor);


export default DoctorRouter;