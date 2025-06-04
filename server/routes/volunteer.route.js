import express from "express";
import { createVolunteer, getAllVolunteers, getVolunteerById, updateVolunteer, deleteVolunteer, getVolunteerStats } from "../controllers/volunteer.controller.js";
import { authUser } from "../middleware/authVolunteer.js";

const volunteerRouter = express.Router();

volunteerRouter.post("/create",authUser,createVolunteer);
volunteerRouter.get("/get-all",authUser,getAllVolunteers);
volunteerRouter.get("/id",authUser,getVolunteerById);
volunteerRouter.put("/update",authUser,updateVolunteer);
volunteerRouter.delete("/delete",authUser,deleteVolunteer);
volunteerRouter.get("/stats",authUser,getVolunteerStats);

export default volunteerRouter;
