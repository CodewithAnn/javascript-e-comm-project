import express from "express";
import { registerController } from "../controller/userController.js";

// route 
const UserRouter = express.Router();
UserRouter.post("/register",registerController);


export default UserRouter;