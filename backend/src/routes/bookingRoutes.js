import express from "express";
import {
  getAllBookings,
  getMyBookings,
  createBooking,
} from "../controllers/bookingController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllBookings);

router.get("/my", verifyToken, getMyBookings);

router.post("/", verifyToken, createBooking);

export default router;
