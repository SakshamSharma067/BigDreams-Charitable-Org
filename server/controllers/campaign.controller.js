import Campaign from "../models/campaign.model.js";

// Create Campaign : /api/campaign/create

export const createCampaign = async (req,res) =>{
    try {
        const {title,description,targetAmount,startDate,endDate,userId} = req.body;
        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (image)=>{
                let result = await cloudinary.uploader.upload(image.path,{resource_type: "image"});
                return result.secure_url;
            })
        );
        const campaign = await Campaign.create({title,description,targetAmount,startDate,endDate,userId,images: imagesUrl});

        return res.json({success: true, campaign});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

// Get All Campaigns : /api/campaign/get-all

export const getAllCampaigns = async (req,res) =>{
    try {
        const campaigns = await Campaign.find({}).sort({createdAt: -1});
        return res.json({success: true, campaigns});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

// Get Campaign by ID : /api/campaign/id

export const campaignById = async (req,res)=>{
    try {
        const { id } = req.body;
        const campaign = Campaign.findById(id);
        res.json({success: true,product})
    } catch (error) {
        
    }
}

// Update Campaign : /api/campaign/update/:id

export const updateCampaign = async (req,res) =>{
    try {
        const { id } = req.params;
        const { title, description, targetAmount, startDate, endDate } = req.body;
        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        const campaign = await Campaign.findByIdAndUpdate(id, {
            title,
            description,
            targetAmount,
            startDate,
            endDate,
            images: imagesUrl
        }, { new: true });

        return res.json({ success: true, campaign });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}