import express from "express";
import { createCampaign, getAllCampaigns, campaignById } from "../controllers/campaign.controller.js";
import { authUser } from "../middleware/authVolunteer.js";
const campaignRouter = express.Router();

campaignRouter.post("/create",createCampaign);
campaignRouter.get("/get-all",authUser,getAllCampaigns);
campaignRouter.get("/id",authUser,campaignById);
campaignRouter.put("/update/:id",authUser,createCampaign);

export default campaignRouter;
