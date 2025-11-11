import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { FormData } from "./models/FormData";

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5174",  // React dev server
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Optional: handle preflight requests explicitly
app.options("/api/form", cors()); 

app.post("/api/form", async (req, res) => {
  try {
    const data = new FormData(req.body);
    await data.save();
    res.status(201).json({ message: "Form saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save form" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
