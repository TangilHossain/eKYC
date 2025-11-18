import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URI);

export function connectDB() {
  client.connect().then(() => console.log("✅ MongoDB connected"));
}
