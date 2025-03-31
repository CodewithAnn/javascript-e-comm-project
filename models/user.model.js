import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

// function to hash password before saving to database
userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 14);
});

// function to compare password
// this function will be used to compare the password entered by the user with the password stored in the database
// this function will be used in the login controller
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};



export const userModel = mongoose.model("Users", userSchema);