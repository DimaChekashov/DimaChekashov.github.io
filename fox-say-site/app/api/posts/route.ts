import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function POST(request: NextRequest) {
  try {
    const { title, excerpt, slug, content, authorId, featuredImage } =
      await request.json();

    if (!title || !excerpt || !slug || !content) {
      return NextResponse.json(
        { error: "All fields must be filled!" },
        { status: 400 },
      );
    }

    const post = await prismaClient.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        authorId,
        ...(featuredImage ? { featuredImage } : {}),
      },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        author: true,
        featuredImage: true,
      },
    });

    return NextResponse.json(
      {
        message: "Post created!",
        post,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error creating post:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server Error!",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const posts = await prismaClient.post.findMany();

    return NextResponse.json(
      {
        success: true,
        data: posts,
        count: posts.length,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching posts:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch posts",
      },
      {
        status: 500,
      },
    );
  }
}
