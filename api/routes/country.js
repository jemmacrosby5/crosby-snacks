import express from "express";
import Country from "../models/country.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching countries" });
      }
  });

  router.get(":id", async (req, res) => {
    try {
      const country = await Country.findById(req.params.id);
      if (!country) {
        return res.status(404).json({ error: "Country not found" });
      }
      res.status(200).json(country);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching country" });
    }
  });

  export default router;