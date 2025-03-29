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