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