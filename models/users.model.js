import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        cycles: {
            type: Map,
            of: Number, // Each key is a bicycle type (String) and the value is the number of cycles (Number)
            required: true,
        },
        security: {
            type: Number,
            required: true, // Fixed typo here
        },
        total: {
            type: Number,
        },
        startTime: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
