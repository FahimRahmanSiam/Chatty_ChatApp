import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    email: {type: String, required: true, unique: true},
    fullName: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    profilePic: {type: String, default: "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg"},
    },
    {timestamps: true}
)

const User = mongoose.model("User",userSchema);

export default User;