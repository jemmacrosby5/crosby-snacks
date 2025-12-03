import express from "express";
import cors from "cors";
import user from "./routes/user.js";
import score from "./routes/score.js";
import country from "./routes/country.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/score", score);
app.use("/country", country);

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy :)" });
  });

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});