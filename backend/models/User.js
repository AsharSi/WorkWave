import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phoneNumber: {
            type: Number
        },
        phoneCode: {
            type: String
        },
        password: {
            type: String,
            required: true,
        },
        address: [
            {
                landmark: {
                    type: String,
                },
                street: {
                    type: String,
                    required: true
                },
                city: {
                    type: Number,
                    required: true
                },
                state: {
                    type: String,
                    required: true
                },
                country: {
                    type: String,
                    required: true
                },
                pinCode: {
                    type: String,
                    required: true
                },
                phoneCode: {
                    type: String,
                    required: true
                },
                phoneNumber: {
                    type: Number,
                    required: true
                },
            }
        ],
        country: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;