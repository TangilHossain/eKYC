import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const PDF_QUEUE = "pdf_generation_queue";

class RabbitMQService {
  private connection: any = null;
  private channel: any = null;

  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(PDF_QUEUE, { durable: true });
      console.log("✅ RabbitMQ connected and queue asserted");
    } catch (error) {
      console.error("❌ RabbitMQ connection error:", error);
      throw error;
    }
  }

  async publishPdfJob(formId: string): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    const message = JSON.stringify({
      formId,
      timestamp: new Date().toISOString(),
    });

    this.channel.sendToQueue(PDF_QUEUE, Buffer.from(message), {
      persistent: true,
    });

    console.log(`📤 PDF job queued for form: ${formId}`);
  }

  async consumePdfJobs(
    callback: (formId: string) => Promise<void>
  ): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    await this.channel.prefetch(1); // Process one job at a time

    this.channel.consume(
      PDF_QUEUE,
      async (msg: any) => {
        if (msg) {
          try {
            const { formId } = JSON.parse(msg.content.toString());
            console.log(`📥 Processing PDF job for form: ${formId}`);

            await callback(formId);

            this.channel!.ack(msg);
            console.log(`✅ PDF job completed for form: ${formId}`);
          } catch (error) {
            console.error("❌ Error processing PDF job:", error);
            // Reject and requeue the message
            this.channel!.nack(msg, false, true);
          }
        }
      },
      { noAck: false }
    );

    console.log("👂 Waiting for PDF jobs...");
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
    console.log("RabbitMQ connection closed");
  }
}

export default new RabbitMQService();
