import Campaign from '../models/campaign.model.js';
import cloudinary from '../utils/cloudinary.js';

// Helper function to handle errors
const handleError = (error, res) => {
    console.error('Error:', error);
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({ success: false, message: error.message });
};

// Create a new campaign : /api/campaign/create
export const createCampaign = async (req, res) => {
    try {
        const { title, description, targetAmount, startDate, endDate } = req.body;
        
        // Upload images to cloudinary if provided
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => 
                cloudinary.uploader.upload(file.path)
            );
            const uploadResults = await Promise.all(uploadPromises);
            imageUrls = uploadResults.map(result => result.secure_url);
        }

        if (imageUrls.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one image is required'
            });
        }

        const campaign = await Campaign.create({
            title,
            description,
            targetAmount: parseFloat(targetAmount),
            startDate,
            endDate,
            images: imageUrls,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            campaign
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Get all campaigns : /api/campaign/get-all
export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            campaigns
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Get campaign by ID : /api/campaign/:id
export const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('createdBy', 'name email')

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        res.status(200).json({
            success: true,
            campaign
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Update campaign : /api/campaign/:id (PUT)
export const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, targetAmount, startDate, endDate } = req.body;

        // Get existing campaign
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        if (campaign.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this campaign'
            });
        }

        let imageUrls = [];
        if (req.files && req.files.images) {
            const uploadPromises = req.files.images.map(file => 
                cloudinary.uploader.upload(file.path, {
                    folder: 'charity_campaigns'
                })
            );
            const uploadResults = await Promise.all(uploadPromises);
            imageUrls = uploadResults.map(result => result.secure_url);
        }

        if (req.body.existingImages) {
            const existingImages = Array.isArray(req.body.existingImages) 
                ? req.body.existingImages 
                : [req.body.existingImages];
            imageUrls = [...existingImages, ...imageUrls];
        }

        const updatedCampaign = await Campaign.findByIdAndUpdate(
            id,
            {
                title: title.trim(),
                description: description.trim(),
                targetAmount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                images: imageUrls.length > 0 ? imageUrls : campaign.images
            },
            { 
                new: true, 
                runValidators: true 
            }
        );

        res.status(200).json({
            success: true,
            campaign: updatedCampaign
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete campaign : /api/campaign/delete/:id
export const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        if (campaign.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this campaign'
            });
        }

        const deletePromises = campaign.images.map(imageUrl => {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            return cloudinary.uploader.destroy(publicId);
        });
        await Promise.all(deletePromises);

        await Campaign.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Campaign deleted successfully'
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Donate to campaign : /api/campaign/:id/donate
export const donateToCompaign = async (req, res) => {
    try {
        const { amount } = req.body;
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        campaign.currentAmount += parseFloat(amount);
        await campaign.save();

        res.status(200).json({
            success: true,
            campaign
        });
    } catch (error) {
        handleError(error, res);
    }
};