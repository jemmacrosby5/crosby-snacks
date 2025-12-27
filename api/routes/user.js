import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Get all scores for a specific country
router.get("/:id", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.find({ userId });
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user", err);
    res.status(500).json({ error: "Error fetching user" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

export default router;