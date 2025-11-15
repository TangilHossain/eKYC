import express from "express";
import { AdminData } from "../models/AdminData";

const router = express.Router();
 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find admin by email
    const admin = await AdminData.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // 2️⃣ Check password
    if (admin.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // 3️⃣ Login successful
    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
