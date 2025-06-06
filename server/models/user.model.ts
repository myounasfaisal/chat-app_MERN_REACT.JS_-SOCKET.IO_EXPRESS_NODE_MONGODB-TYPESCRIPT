import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
import { IUser } from "../types/auth";


const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    DoB: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
}, { timestamps: true })



userSchema.pre("save", async function (next) {
    if (!this?.isModified("password")) next();
    else {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        console.log('234')
        next();
    }
})

userSchema.methods.comparePassword = async function (password: string) {
    const isValid: boolean = await bcryptjs.compare(password, this.password);
    return isValid;
}

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

