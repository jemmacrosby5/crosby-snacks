import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
  highScore: { type: Number, required: true },
  lowScore: { type: Number, required: true }
});

export default mongoose.model("Score", scoreSchema);
