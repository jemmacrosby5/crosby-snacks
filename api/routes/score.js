import express from "express";
import Score from "../models/score.js";

const router = express.Router();

// Get all scores for a specific country
router.get("/country/:countryId", async (req, res) => {
  try {
    const { countryId } = req.params;
    const scores = await Score.find({ countryId });
    res.status(200).json(scores);
  } catch (err) {
    console.error("Error fetching scores for country:", err);
    res.status(500).json({ error: "Error fetching scores for country" });
  }
});

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

// Get average scores grouped by country
router.get("/average", async (req, res) => {
  try {
    const results = await Score.aggregate([
      {
        $group: {
          _id: "$countryId",
          avgHighScore: { $avg: "$highScore" },
          avgLowScore: { $avg: "$lowScore" },
          avgDifference: { $avg: { $subtract: ["$highScore", "$lowScore"] } },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "countries",
          localField: "_id",
          foreignField: "_id", 
          as: "country"
        }
      },

      { $unwind: "$country" },

      {
        $project: {
          _id: 0,
          countryId: "$_id",
          countryName: "$country.name",
          countryCode: "$country.code",
          avgHighScore: 1,
          avgLowScore: 1,
          avgDifference: 1,
          count: 1
        }
      },

      // Sort highest avgHighScore first
      { $sort: { avgHighScore: -1 } }
    ]);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error grouping scores:", err);
    res.status(500).json({ error: "Error grouping scores" });
  }
});


// Submit a new score
router.post("/", async (req, res) => {
  try {
    const { userId, countryId, highScore, lowScore } = req.body;

    if (!userId || !countryId || highScore == null || lowScore == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newScore = new Score({
      userId,
      countryId,
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