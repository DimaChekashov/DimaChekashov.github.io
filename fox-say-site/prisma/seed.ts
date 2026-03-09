import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  if (admins.length > 1) {
    throw new Error("More than one admin exists. Keep exactly one admin user.");
  }

  let adminId: number;

  if (admins.length === 1) {
    const updatedAdmin = await prisma.user.update({
      where: { id: admins[0].id },
      data: {
        username: adminUsername,
        email: adminEmail,
        passwordHash,
        displayName: "Администратор",
        role: "ADMIN",
        isActive: true,
      },
      select: { id: true, username: true },
    });

    adminId = updatedAdmin.id;
    console.log(`Admin updated: ${updatedAdmin.username}`);
  } else {
    const createdAdmin = await prisma.user.create({
      data: {
        username: adminUsername,
        email: adminEmail,
        passwordHash,
        displayName: "Администратор",
        role: "ADMIN",
        bio: "Главный администратор сайта",
        isActive: true,
      },
      select: { id: true, username: true },
    });

    adminId = createdAdmin.id;
    console.log(`Admin created: ${createdAdmin.username}`);
  }

  const welcomePost = await prisma.post.findUnique({
    where: { slug: "welcome-to-blog" },
    select: { id: true },
  });

  if (!welcomePost) {
    await prisma.post.create({
      data: {
        title: "Welcome to the blog",
        slug: "welcome-to-blog",
        content:
          "<p>This is your first post. You can create and publish new posts from the admin panel.</p>",
        excerpt: "The first post in your blog.",
        authorId: adminId,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
    console.log("Welcome post created.");
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
