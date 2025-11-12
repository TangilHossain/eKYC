import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: String,
  message: String,
  gptResponse: String
});

export const FormData = mongoose.model("FormData", formSchema);
