import { prisma } from "../config/db.js";

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { clientName, service } = req.body;
    const booking = await prisma.booking.create({ data: { clientName, service } });
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    next(error);
  }
};
