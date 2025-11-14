import express from "express";
import { submitForm, getForms } from "../controllers/FormController";


const router = express.Router();

router.post("/", submitForm);
router.get("/", getForms);

export default router;
