import express from "express";
import { getAllBookings, createBooking } from "../controllers/bookingController.js";

const router = express.Router();
router.get("/", getAllBookings);
router.post("/", createBooking);

export default router;
