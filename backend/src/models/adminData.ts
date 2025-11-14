import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

export const FormData = mongoose.model("adminData", adminSchema);
