import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender_Id: {
        type: String,
        required: true,
    },
    receiver_Id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamps: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export default mongoose.model("Message", messageSchema);
