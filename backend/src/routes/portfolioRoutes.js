import express from "express";
import { getPortfolio, addProject } from "../controllers/portfolioController.js";

const router = express.Router();
router.get("/", getPortfolio);
router.post("/", addProject);

export default router;
