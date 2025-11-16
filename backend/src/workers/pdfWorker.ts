import dotenv from "dotenv";
import { connectDB } from "../db";
import rabbitMQService from "../services/RabbitMQService";
import pdfService from "../services/PdfService";
import { FormData } from "../models/FormData";

dotenv.config();

async function startWorker() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("📦 Worker connected to MongoDB");

    // Connect to RabbitMQ
    await rabbitMQService.connect();

    // Start consuming PDF jobs
    await rabbitMQService.consumePdfJobs(async (formId: string) => {
      console.log(`🔄 Processing PDF for form ID: ${formId}`);

      // Fetch form data from database
      const formData = await FormData.findById(formId);

      if (!formData) {
        throw new Error(`Form not found: ${formId}`);
      }

      // Generate PDF
      const pdfPath = await pdfService.generatePdf({
        _id: formData._id.toString(),
        name: formData.name || "",
        email: formData.email || "",
        age: formData.age || "",
        message: formData.message || "",
        gptResponse: formData.gptResponse || undefined,
      });

      console.log(`✅ PDF generated successfully: ${pdfPath}`);
    });
  } catch (error) {
    console.error("❌ Worker error:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n⏹️  Shutting down worker...");
  await rabbitMQService.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⏹️  Shutting down worker...");
  await rabbitMQService.close();
  process.exit(0);
});

startWorker();
