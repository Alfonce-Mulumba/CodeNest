import { prisma } from "../config/db.js";

export const getAllServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

export const addService = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newService = await prisma.service.create({ data: { title, description } });
    res.status(201).json({ message: "Service added successfully", newService });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};
