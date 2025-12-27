import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clerkId: { type: String, required: true },
  picUrl: { type: String, required: false }
});

export default mongoose.model("User", userSchema);
