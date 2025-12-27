import express from "express";
import cors from "cors";
import user from "./routes/user.js";
import score from "./routes/score.js";
import country from "./routes/country.js";
import trip from "./routes/trip.js";
import { connectDB } from "./db/connection.js";

await connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/score", score);
app.use("/country", country);
app.use("/trip", trip)

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));
