import express from "express";
import { createDonation, getAllDonations, getDonationsById, getDonationStatus } from "../controllers/donation.controller.js";
import { authUser } from "../middleware/authVolunteer.js";

const donationRouter = express.Router();

donationRouter.post("/create",authUser,createDonation);
donationRouter.get("/get-all",authUser,getAllDonations);
donationRouter.get("/id",authUser,getDonationsById);
donationRouter.get("/campaign-id",authUser,getDonationsByCampaignId);
donationRouter.get("/status",authUser,getDonationStatus);

export default donationRouter;
