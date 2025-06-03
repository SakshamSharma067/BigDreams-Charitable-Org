import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
},{timestamps: true})

const Donation = mongoose.model("Donation",donationSchema)

export default Donation;
