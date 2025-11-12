import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { FormData } from "./models/FormData";
import formRoutes from "./routes/formRoutes";

import axios from "axios";
import OpenAI from "openai"
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"],
});


dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",  // React dev server
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Optional: handle preflight requests explicitly
app.options("/api/form", cors()); 
app.use("/api/forms", formRoutes);

app.get("api/form", async(require,res) => {
  try {
    const forms = (await FormData.find());
    res.status(200).json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to reach"});
  }
});


app.post("/api/form", async (req, res) => {
  try {
    const userInput = req.body;
    const prompt = `Generate an assumption about the person from given data, Form submission:\nName: ${userInput.name}\nEmail: ${userInput.email}\nAge: ${userInput.age}\nMessage: ${userInput.message}`;
    
    const chatCompletion = await openRouter.chat.send({
              model: "gpt-3.5-turbo", // Or another suitable model like "gpt-4o"
              messages: [{ role: "user", content: prompt }],
            });
            console.log(chatCompletion.choices[0].message?.content);
  
    const gptResponse = chatCompletion.choices[0].message?.content;
    console.log(gptResponse)
    const formDataWithGPT = {
      ...userInput,
      gptResponse: gptResponse
    };
    const data = new FormData(formDataWithGPT);
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
