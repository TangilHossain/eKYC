import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import formRoutes from "./routes/formRoutes";
import AdminRoutes from "./routes/AdminRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/forms", formRoutes);
app.use("/api/admin", AdminRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
