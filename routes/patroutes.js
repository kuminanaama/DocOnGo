import {Router} from "express";
import { loginPatient, registerPatient } from "../controllers/patcontroller.js";


const PatientRouter = Router();

PatientRouter.post('/patient/register', registerPatient);
PatientRouter.post('/patient/login',  loginPatient);


export default PatientRouter;