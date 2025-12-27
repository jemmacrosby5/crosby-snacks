import express from "express";
import Score from "../models/score.js";

const router = express.Router();

// Get all scores by a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const scores = await Score.find({ userId });
    res.status(200).json(scores);
  } catch (err) {
    console.error("Error fetching scores by user:", err);
    res.status(500).json({ error: "Error fetching scores by user" });
  }
});

// Get average scores grouped by trip
router.get("/average", async (req, res) => {
  try {
    const results = await Score.aggregate([
      {
        $group: {
          _id: "$tripId",
          avgHighScore: { $avg: "$highScore" },
          avgLowScore: { $avg: "$lowScore" },
          avgDifference: { $avg: { $subtract: ["$highScore", "$lowScore"] } },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "trips",
          localField: "_id",
          foreignField: "_id",
          as: "trip"
        }
      },
      { $unwind: "$trip" },
      {
        $lookup: {
          from: "countries",
          localField: "trip.countryId",
          foreignField: "_id",
          as: "country"
        }
      },
      { $unwind: "$country" },
      {
        $project: {
          _id: 0,
          tripId: "$_id",
          tripName: "$trip.name",
          countryId: "$country._id",
          countryName: "$country.name",
          countryCode: "$country.code",
          avgHighScore: 1,
          avgLowScore: 1,
          avgDifference: 1,
          count: 1
        }
      },
      { $sort: { avgDifference: -1 } }
    ]);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error grouping scores:", err);
    res.status(500).json({ error: "Error grouping scores" });
  }
});


// Submit a new score (must reference a trip)
router.post("/", async (req, res) => {
  try {
    const { userId, tripId, highScore, lowScore } = req.body;

    if (!userId || !tripId || highScore == null || lowScore == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newScore = new Score({
      userId,
      tripId,
      highScore,
      lowScore,
    });

    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (err) {
    console.error("Error submitting score:", err);
    res.status(500).json({ error: "Error submitting score" });
  }
});

export default router;