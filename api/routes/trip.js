import express from "express";
import mongoose from "mongoose";
import Score from "../models/score.js";
import Trip from "../models/trip.js";

const router = express.Router();

// Get all trips
router.get("/", async (req, res) => {
    try {
        const trips = await Trip.find().lean();
        res.status(200).json(trips);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching trips" });
      }
});


router.get("/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;

    // 1️⃣ Fetch trip details
    const trip = await Trip.findById(tripId)
      .populate("participants", "name picUrl")
      .populate("countryId", "name code")
      .lean();

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2️⃣ Fetch scores
    const rawScores = await Score.find({ tripId })
      .populate("userId", "name picUrl")
      .lean();

    // 3️⃣ Normalize scores (Decimal128 -> number)
    const scores = rawScores.map((score) => ({
      ...score,
      highScore:
        score.highScore != null
          ? Number(score.highScore)
          : null,
      lowScore:
        score.lowScore != null
          ? Number(score.lowScore)
          : null,
    }));

    // 4️⃣ Calculate averages
    const validScores = scores.filter(
      (s) => typeof s.highScore === "number" && typeof s.lowScore === "number"
    );

    let avgHigh = null;
    let avgLow = null;
    let diff = null;

    if (validScores.length > 0) {
      const totalHigh = validScores.reduce((sum, s) => sum + s.highScore, 0);
      const totalLow = validScores.reduce((sum, s) => sum + s.lowScore, 0);

      avgHigh = Number((totalHigh / validScores.length).toFixed(2));
      avgLow = Number((totalLow / validScores.length).toFixed(2));
      diff = Number((avgHigh - avgLow).toFixed(2));
    }

    // 5️⃣ Send response
    res.status(200).json({
      trip,
      scores,
      averages: {
        avgHigh,
        avgLow,
        diff,
      },
    });
  } catch (err) {
    console.error("Error fetching trip details:", err);
    res.status(500).json({ error: "Error fetching trip details" });
  }
});





router.post("/", async (req, res) => {
  try {
    const { countryId, description, date, participants } = req.body;

    const newTrip = new Trip({
      countryId,
      description,
      date,
      participants,
      createdAt: new Date()
    });

    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    console.error("Error creating trip:", err);
    res.status(500).json({ error: "Error creating trip" });
  }
});

export default router;