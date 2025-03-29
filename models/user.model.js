import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Name is required"],

    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required : [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
    },
    imageUrl:{
        type: String
    },


},{timestamps: true});

export const userModel = mongoose.model("Users", userSchema);