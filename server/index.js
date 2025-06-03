import express from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "*", credentials: true}));

mongoose.connect(`${MONGODB_URI}/charityWebsite`)
    .then(()=>{
        console.log("Connected to Database");
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err)=>{
        console.log(err);
    })


app.get("/", (req,res)=>{
    res.send("Backend is running")
})

app.use("/api/user",userRouter);



