import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please check data entry"]
    },
    email: {
        type: String,
        required: [true, "Please check data entry"]
    },
    pwd: {
        type: String,
        required: [true, "Please check data entry"]
    }
});

export const User = mongoose.model("profiles", userSchema);
