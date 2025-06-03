import express from "express";
import { register, login, logout, isAuth } from "../controllers/user.controller.js";
import authUser from "../middleware/authUser.js";
const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",authUser,logout);
userRouter.get("/is-auth",authUser,isAuth);

export default userRouter;
