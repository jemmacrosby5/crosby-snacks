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

// Get details of a specific trip
router.get("/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId)
      .populate("participants", "name picUrl")
      .populate("countryId", "name code")
      .lean();
    res.status(200).json(trip);
  } catch (err) {
    console.error("Error fetching details for trip:", err);
    res.status(500).json({ error: "Error fetching details for trip" });
  }
});

// Get all scores for a specific trip
router.get("/:tripId/scores", async (req, res) => {
  try {
    const { tripId } = req.params;

    const scores = await Score.find({ tripId })
      .populate("userId", "id name picUrl")
      .populate("tripId", "name countryId date");

    res.status(200).json(scores);
  } catch (err) {
    console.error("Error fetching scores for trip:", err);
    res.status(500).json({ error: "Error fetching scores for trip" });
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