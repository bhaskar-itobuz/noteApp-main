import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    timestamps: {
        type: Date,
        required:true,
        default:Date.now
    },
});

export default mongoose.model("notes", noteSchema);