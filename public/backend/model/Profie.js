import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        gender: String,
        age: Number,
        city: String,
        education: String, 
        sect: String,
        status: {type: String, default: "pending"}
    }, {timestamps: true}
)


export default mongoose.model("Profile", profileSchema)