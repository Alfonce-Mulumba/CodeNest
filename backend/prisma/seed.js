import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // -----------------------------
  // 🌐 Seed Services
  // -----------------------------
  const services = [
    { title: "Web Development", description: "Full-stack website development using modern technologies." },
    { title: "Academic Writing", description: "High-quality research and academic writing services." },
    { title: "Graphic Design", description: "Creative visual design solutions for your brand." },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { title: service.title },
      update: {},
      create: service,
    });
  }

  console.log("✅ Services seeded successfully.");

  // -----------------------------
  // 💼 Seed Projects
  // -----------------------------
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "An online store built with React and Node.js.",
    },
    {
      title: "Writing Dashboard",
      description: "A dashboard to manage client writing projects.",
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { title: project.title },
      update: {},
      create: project,
    });
  }

  console.log("✅ Projects seeded successfully.");

  // -----------------------------
  // 👑 Seed Admin User
  // -----------------------------
  const adminEmail = "alfoncemulumba@gmail.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    await prisma.user.create({
      data: {
        name: "Administrator",
        email: "alfoncemulumba@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("👑 Admin user created successfully!");
  } else {
    console.log("ℹ️ Admin user already exists, skipping creation.");
  }

  console.log("✅ Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
