import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding is begin...");

  const user1 = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@example.com",
      passwordHash: "$2b$10$example_hashed_password",
      displayName: "Администратор",
      role: "ADMIN",
      bio: "Главный администратор сайта",
    },
  });

  console.log("Created users:", user1.username);

  const programming = await prisma.category.create({
    data: {
      name: "Программирование",
      slug: "programming",
      description: "Статьи о программировании и разработке",
    },
  });

  const javascript = await prisma.category.create({
    data: {
      name: "JavaScript",
      slug: "javascript",
      description: "Все о JavaScript",
      parentId: programming.id,
    },
  });

  const react = await prisma.category.create({
    data: {
      name: "React",
      slug: "react",
      description: "React и экосистема",
      parentId: javascript.id,
    },
  });

  console.log("Catigories created!");

  const jsTag = await prisma.tag.create({
    data: {
      name: "JavaScript",
      slug: "javascript-tag",
    },
  });

  const reactTag = await prisma.tag.create({
    data: {
      name: "React",
      slug: "react-tag",
    },
  });

  const webTag = await prisma.tag.create({
    data: {
      name: "Web Development",
      slug: "web-dev",
    },
  });

  console.log("Tags created!");

  const post1 = await prisma.post.create({
    data: {
      title: "Введение в React",
      slug: "vvedenie-v-react",
      content: "Это содержимое статьи о React...",
      excerpt: "Изучаем основы React библиотеки",
      authorId: user1.id,
      status: "PUBLISHED",
      publishedAt: new Date(),
      categories: {
        create: [{ categoryId: react.id }],
      },
      tags: {
        create: [{ tagId: reactTag.id }, { tagId: jsTag.id }],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Современный JavaScript",
      slug: "sovremenny-javascript",
      content: "ES6+ возможности JavaScript...",
      excerpt: "Обзор новых возможностей JavaScript",
      authorId: user1.id,
      status: "PUBLISHED",
      publishedAt: new Date(),
      categories: {
        create: [{ categoryId: javascript.id }],
      },
      tags: {
        create: [{ tagId: jsTag.id }, { tagId: webTag.id }],
      },
    },
  });

  console.log("Posts created!");

  const comment1 = await prisma.comment.create({
    data: {
      content: "Отличная статья! Очень помогла разобраться с React.",
      postId: post1.id,
      userId: user1.id,
      status: "APPROVED",
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: "Спасибо за подробное объяснение!",
      postId: post1.id,
      userId: user1.id,
      parentId: comment1.id,
      status: "APPROVED",
    },
  });

  console.log("Comments created!");
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
