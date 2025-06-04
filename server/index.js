import express from "express";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import campaignRouter from "./routes/campaign.route.js";
import donationRouter from "./routes/donation.route.js";
import volunteerRouter from "./routes/volunteer.route.js";
const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
await connectCloudinary();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "*", credentials: true}));

app.get("/", (req,res)=>{
    res.send("Backend is running")
})

app.use("/api/user",userRouter);
app.use("/api/campaign",campaignRouter);
app.use("/api/donation",donationRouter);
app.use("/api/volunteer",volunteerRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})



