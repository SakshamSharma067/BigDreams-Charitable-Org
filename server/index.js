import express from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";

const app = express();
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



