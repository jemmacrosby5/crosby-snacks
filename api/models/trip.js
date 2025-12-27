import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  description: { type: String },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
  date: { type: Date },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Trip", tripSchema);
