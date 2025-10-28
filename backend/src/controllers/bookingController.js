import { prisma } from "../config/db.js";

export const getAllBookings = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { service, price } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const booking = await prisma.booking.create({
      data: {
        clientName: user.name,
        service,
        price,
        userId: user.id,
      },
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};
