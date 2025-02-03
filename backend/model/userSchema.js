import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// eslint-disable-next-line no-unused-vars
import { string } from "zod";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default : false
    },
    fileName: {
        type : String,
        default : "",
    },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


export default mongoose.model("person", userSchema);