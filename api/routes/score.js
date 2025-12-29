import express from "express";
import Score from "../models/score.js";

const router = express.Router();

const leaderboardPipeline = [
  {
    $group: {
      _id: "$tripId",
      avgHigh: { $avg: "$highScore" },
      avgLow: { $avg: "$lowScore" },
      scoreCount: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "trips",
      localField: "_id",
      foreignField: "_id",
      as: "trip",
    },
  },
  { $unwind: "$trip" },
  {
    $lookup: {
      from: "countries",
      localField: "trip.countryId",
      foreignField: "_id",
      as: "country",
    },
  },
  { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "users",
      localField: "trip.participants",
      foreignField: "_id",
      as: "participants",
    },
  },
  {
    $project: {
      tripId: "$_id",
      description: "$trip.description",
      date: "$trip.date",
      country: { name: "$country.name", code: "$country.code" },
      participants: {
        $map: {
          input: "$participants",
          as: "p",
          in: {
            _id: "$$p._id",
            name: "$$p.name",
            picUrl: "$$p.picUrl",
          },
        },
      },
      avgHigh: { $round: ["$avgHigh", 2] },
      avgLow: { $round: ["$avgLow", 2] },
      diff: { $round: [{ $subtract: ["$avgHigh", "$avgLow"] }, 2] },
      scoreCount: 1,
    },
  },
  { $sort: { diff: -1 } },
];

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

/**
 * GET /leaderboard
 * Returns top 5 trips by score diff
 */
router.get("/leaderboard", async (req, res) => {
  try {
    const results = await Score.aggregate([
      ...leaderboardPipeline,
      { $limit: 5 },
    ]);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error building leaderboard:", err);
    res.status(500).json({ error: "Error building leaderboard" });
  }
});

/**
 * GET /all/sorted
 * Returns all trips sorted by score diff
 */
router.get("/all/sorted", async (req, res) => {
  try {
    const results = await Score.aggregate(leaderboardPipeline);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching sorted scores:", err);
    res.status(500).json({ error: "Error fetching sorted scores" });
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