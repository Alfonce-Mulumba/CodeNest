import express from "express";
import { getAllUsers, updateUser, deleteUser, addProject, updateProject } from "../controllers/adminController.js";
import { deleteService } from "../controllers/serviceController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", verifyToken, isAdmin, getAllUsers);
router.put("/users/:id", verifyToken, isAdmin, updateUser);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);
router.post("/projects", verifyToken, isAdmin, addProject);
router.put("/projects/:id", verifyToken, isAdmin, updateProject);

router.delete("/services/:id", verifyToken, isAdmin, deleteService);

export default router;
