import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["cash","upi","card"],
        required: true,
    },
    transactionId: {
        type: String,
    },
},{timestamps: true})

const Donation = mongoose.model("Donation",donationSchema)

export default Donation;
