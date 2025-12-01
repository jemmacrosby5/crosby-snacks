import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/user.js";
import Country from "./models/country.js";
import Score from "./models/score.js";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

async function seed() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Country.deleteMany({});
    await Score.deleteMany({});

    // Create users
    const jemma = await User.create({
      username: "jemma",
      email: "jemma@example.com"
    });

    const bob = await User.create({
      username: "bob",
      email: "bob@example.com"
    });

    // Create countries
    const japan = await Country.create({ name: "Japan", code: "JP" });
    const usa = await Country.create({ name: "USA", code: "US" });

    // Create scores
    await Score.create({
      userId: jemma._id,
      countryId: japan._id,
      highScore: 9,
      lowScore: 2
    });

    await Score.create({
      userId: bob._id,
      countryId: japan._id,
      highScore: 7,
      lowScore: 3
    });

    await Score.create({
      userId: jemma._id,
      countryId: usa._id,
      highScore: 8,
      lowScore: 1
    });

    console.log("Database seeded successfully!");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
