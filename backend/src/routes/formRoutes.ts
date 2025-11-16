import express from "express";
import {
  submitForm,
  getForms,
  generatePdf,
} from "../controllers/FormController";

const router = express.Router();

router.post("/", submitForm);
router.get("/", getForms);
router.post("/:id/generate-pdf", generatePdf);

export default router;
