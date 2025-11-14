import { Request, Response } from "express";
import { FormData } from "../models/FormData";
import { generateGPTResponse } from "../services/OpenRouterServices";

export const submitForm = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Get GPT response
    const gptResponse = await generateGPTResponse(userData);

    const newForm = new FormData({
      ...userData,
      gptResponse,
    });

    await newForm.save();

    res.status(201).json({ message: "Form saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit form" });
  }
};

export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await FormData.find();
    res.status(200).json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
};
