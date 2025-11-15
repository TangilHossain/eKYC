import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

export const AdminData = mongoose.model("AdminData", adminSchema);
