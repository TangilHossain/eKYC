import express from "express";
import { FormData } from "../models/FormData";

const router = express.Router();

// Get all form submissions
router.get("/", async (req, res) => {
  try {
    const forms = await FormData.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching forms" });
  }
});

export default router;
