import { Router } from 'express';
import { 
    createCampaign, 
    getAllCampaigns, 
    getCampaignById, 
    updateCampaign, 
    deleteCampaign,
    donateToCompaign
} from "../controllers/campaign.controller.js";
import { isAuthenticated} from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const campaignRouter = Router();

// Public routes
campaignRouter.get("/get-all", getAllCampaigns);
campaignRouter.get("/:id", getCampaignById);

// Protected routes
campaignRouter.post("/create", isAuthenticated, upload.array('images', 5), createCampaign);
campaignRouter.put("/:id", isAuthenticated, upload.array('images', 5), updateCampaign);
campaignRouter.delete("/delete/:id", isAuthenticated, deleteCampaign);
campaignRouter.post("/:id/donate", isAuthenticated, donateToCompaign);

export default campaignRouter;
