import express from "express";
import { getAllServices, addService, deleteService } from "../controllers/serviceController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", verifyToken, isAdmin, addService);
router.delete("/:id", verifyToken, isAdmin, deleteService);

export default router;
