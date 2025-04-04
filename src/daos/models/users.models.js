import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        // required: true,
        // default: 0
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    image: {
        type: String,
    },
    isGithub: {
        type: Boolean,
        default: false
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        default: null
    }
});

export const UserModel = model("users", UserSchema);