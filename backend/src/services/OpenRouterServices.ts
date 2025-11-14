import { OpenRouter } from "@openrouter/sdk";

import dotenv from "dotenv"
dotenv.config()

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

export async function generateGPTResponse(form: any) {
  const prompt = `
Generate an assumption about this person:
Name: ${form.name}
Email: ${form.email}
Age: ${form.age}
Message: ${form.message}
  `;

  const response = await openRouter.chat.send({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message?.content || "No response";
}