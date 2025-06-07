import Donation from "../models/donation.model.js";
import Campaign from "../models/campaign.model.js";

// Create Donation : /api/donation/create
export const createDonation = async (req,res) => {
    const {campaignId, amount, paymentMethod, transactionId, donorName, donorEmail} = req.body;

    try {
        // Only validate campaign if campaignId is provided
        if (campaignId) {
            const campaign = await Campaign.findById(campaignId);
            if(!campaign){
                return res.status(404).json({message: "Campaign not found"});
            }
        }

        const donation = await Donation.create({
            campaignId,
            amount,
            paymentMethod,
            transactionId,
            donorName,
            donorEmail
        });

        // If this is a campaign donation, update the campaign amount
        if (campaignId) {
            const campaign = await Campaign.findById(campaignId);
            campaign.currentAmount += parseFloat(amount);
            await campaign.save();
        }

        return res.status(201).json({success: true, donation});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}

// Get All Donations : /api/donation/get-all
export const getAllDonations = async (req,res) => {
    try {
        const donations = await Donation.find().populate("campaignId").sort({createdAt: -1});
        return res.status(200).json({success: true, donations});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}

// Get Donations by ID : /api/donation/:id
export const getDonationsById = async (req,res) => {
    const {id} = req.params;
    try {
        const donation = await Donation.findById(id).populate("campaignId");
        if(!donation){
            return res.status(404).json({message: "Donation not found"});
        }
        return res.status(200).json({success: true, donation});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}

// Get Donation Status : /api/donation/status/:campaignId
export const getDonationStatus = async (req,res) => {
    const {campaignId} = req.params;
    try {
        const donations = await Donation.find({campaignId}).populate("campaignId").sort({createdAt: -1});
        const totalDonations = donations.reduce((acc,donation)=>acc+donation.amount,0);
        const totalDonationsCount = donations.length;
        return res.status(200).json({success: true, totalDonations, totalDonationsCount});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: error.message});
    }
}
