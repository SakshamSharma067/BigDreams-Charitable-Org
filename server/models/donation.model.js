import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: false,
    },
    paymentMethod: {
        type: String,
        enum: ["card", "paypal", "bank", "cash", "upi"],
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    donorName: {
        type: String,
        required: true,
    },
    donorEmail: {
        type: String,
        required: true,
    }
},{timestamps: true})

const Donation = mongoose.model("Donation",donationSchema)

export default Donation;
