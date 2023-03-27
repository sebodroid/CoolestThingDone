import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user name required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email required"],
        lowercase: true,
        unique: true
    },
    pwd: {
        type: String,
        required: [true, "password required"],
        minLength: 8,
    }
});

export const User = mongoose.model("profiles", userSchema);
