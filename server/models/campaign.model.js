import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},{timestamps: true})

const Campaign = mongoose.model("Campaign",campaignSchema)

export default Campaign;
