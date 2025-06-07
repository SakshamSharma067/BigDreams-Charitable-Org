import { Router } from 'express';
import { 
    createDonation, 
    getAllDonations, 
    getDonationsById,
    getDonationStatus
} from '../controllers/donation.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const donationRouter = Router();

// Public routes
donationRouter.get('/get-all', getAllDonations);
donationRouter.get('/:id', getDonationsById);

// Protected routes
donationRouter.post('/create', isAuthenticated, createDonation);
donationRouter.get('/status/:campaignId', isAuthenticated, getDonationStatus);

export default donationRouter;
