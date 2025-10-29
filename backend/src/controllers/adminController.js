import { prisma } from "../config/db.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        verified: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, verified } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, role, verified },
    });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const { title, description, githubLink, liveLink, imageUrl } = req.body;
    const newProject = await prisma.project.create({
      data: { title, description, githubLink, liveLink, imageUrl },
    });
    res.status(201).json({ message: "Project added successfully", newProject });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, githubLink, liveLink, imageUrl, price } = req.body;

    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        githubLink,
        liveLink,
        imageUrl,
        price,
      },
    });

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Project not found" });
    }
    next(error);
  }
};
