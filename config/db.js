import mongoose from "mongoose";
import colors from "colors";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected${mongoose.connection.host}`);
    } catch (error) {
    console.log(`MongoDB Error : ${error}`.bgRed.white);
    
    }
}

export default connectDB;