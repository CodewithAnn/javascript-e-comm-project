import express from "express";
import { loginController, registerController } from "../controller/userController.js";

// route 
const UserRouter = express.Router();
UserRouter.post("/register",registerController);
UserRouter.post("/login",loginController);

export default UserRouter;