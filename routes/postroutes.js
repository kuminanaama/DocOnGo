import { Router } from "express";
import { deleteRequest, getRequest, getRequestById, postRequest, updateRequest } from "../controllers/patcontroller.js";
import { responseImage, symptomImage } from "../middlewares/upload.js";
import {authmiddleware} from "../middlewares/auth.js";
import { createResponse, getMyRequests, getSingleRequestById, updateRequestById } from "../controllers/doc_controller.js";

const PostRouter = Router();

PostRouter.post("/request",authmiddleware,symptomImage.single("image"), postRequest);
PostRouter.get("/request", getRequest);
PostRouter.get("/request/:id", getRequestById);
PostRouter.patch("/request/:id", symptomImage.single("image"), updateRequest);
PostRouter.delete("/request/:id", deleteRequest);




PostRouter.get("/my-requests",authmiddleware,getMyRequests);

PostRouter.get("/my-singlerequest/:id",authmiddleware,getSingleRequestById);

PostRouter.patch("/my-updatedrequest/:id",authmiddleware,updateRequestById);


PostRouter.post('/response/:requestId',authmiddleware,responseImage .single("image"),createResponse)


export default PostRouter;