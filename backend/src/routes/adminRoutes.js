import express from "express";
import { getAllUsers, updateUser, deleteUser } from "../controllers/adminController.js";
import { deleteService } from "../controllers/serviceController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🧍‍♂️ Users management
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.put("/users/:id", verifyToken, isAdmin, updateUser);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

// 💼 Service management
router.delete("/services/:id", verifyToken, isAdmin, deleteService);

export default router;
