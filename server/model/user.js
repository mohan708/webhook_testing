import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String,required: true },
    name: { type: String, required: true },
    image: { type: String, },
    resume: { type: String }
})

const user = mongoose.model("user", userSchema);

export default user;