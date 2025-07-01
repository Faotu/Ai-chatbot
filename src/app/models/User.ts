import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  lastname: { type: String },
  avatar: {
    type: String,
    default: "/avatar2.jpg", // fallback avatar
  },
});

export default mongoose.models.Users || mongoose.model("Users", userSchema);
