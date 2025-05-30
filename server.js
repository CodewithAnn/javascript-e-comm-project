import express, { json } from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// dotenv config
dotenv.config();
// database connect
connectDB()
const app = express();
//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// routes
import UserRouter from "./routes/userRoute.js"
app.use("/api/v1/user/",UserRouter )
app.get("/test", (request,response)=>{
    response.status(200).send(`<Headers>App is running</Header>`);
});

const PORT = process.env.PORT ||8080;
app.listen(PORT,(request,response)=>{
    return console.log(`Running on ${PORT}`.bgYellow.black);
});


