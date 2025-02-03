import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    timestamps: {
        type: Date,
        required:true,
        default:Date.now
    },

});

export default mongoose.model("Log in user", sessionSchema);