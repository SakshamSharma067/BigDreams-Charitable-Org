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
    targetAmount: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    }, 
    endDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
},{timestamps: true})

const Campaign = mongoose.model("Campaign",campaignSchema)

export default Campaign;
