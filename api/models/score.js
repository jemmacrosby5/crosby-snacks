import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  highScore: { type: Number, required: true },
  lowScore: { type: Number, required: true }
});

export default mongoose.model("Score", scoreSchema);
