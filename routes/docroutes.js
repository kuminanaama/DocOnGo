import { Router } from "express";
import {
  loginDoctor,
  registerDoctor,
  verifyEmail,
} from "../controllers/doc_controller.js";

const DoctorRouter = Router();

DoctorRouter.post("/doctor/register", registerDoctor);
DoctorRouter.post("/doctor/verify-email", verifyEmail);
DoctorRouter.post("/doctor/login", loginDoctor);

export default DoctorRouter;
