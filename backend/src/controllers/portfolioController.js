import { prisma } from "../config/db.js";

export const getPortfolio = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
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
