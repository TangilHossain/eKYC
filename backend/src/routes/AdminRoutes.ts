import express from "express";
import { AdminData } from "../models/AdminData";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received:", email, password); // 🟡 Debug

    const admin = await AdminData.findOne({ email });

    console.log("DB result:", admin); // 🟡 Debug

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
