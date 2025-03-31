import { json, request, response } from "express";
import { userModel } from "../models/user.model.js";

export const registerController = async(request, response)=>{
    try {
        // user register logic here
        const {name,email,password,imageUrl} = request.body;
        if(
            !name || !email || !password
        ){
            return response.status(400).send({
                success: false,
                message : "All fields are required",
            })
        }

        // check if user already exists
        const userExists = await userModel.findOne({email});
        if(userExists){
            return response.status(400).send({
                success: false,
                message : "User already exists",
            })
        }
        // create new user
        const user =await userModel.create({
            name,
            email,
            password,
            imageUrl,
        })
        return response.status(201).send({
            success: true,
            message : "User registered successfully",
             data:user,
        })
    } catch (error) {
        console.log(`error while registering user: ${error.message} `);
        response.status(500).send({
            success: false,
            message : "Server Error",
            error: error
        })
    }
}

export const loginController = async(request,response) =>{
    try {
        // extracting data from request body (Destructuring)
        const {email,password} = request.body;
        if(!email || !password){
            return response.status(400).send({
                success:false,
                message: "All fields are required",
            });
        }

        // check if user exists of not, find user by email
        const user = await userModel.findOne({email});
        if(!user){
            return response.status(404).send({
                success:false,
                message:"User not found",
            });
        }

        // check if password is correct with the help of comparePassword method
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return response.status(401).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        // send response
        return response.status(200).send({
            success: true,
            message: "User logged in successfully",
            data:user,
        })

    } catch (error) {
        console.log(`error while logging in user: ${error.message} `.cyan);
        response.status(500).send(
            {
                success: false,
                message: "Server Error",
                error: error.message
            }
        );
    }
}