import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prismaClient } from "../../../lib/prisma/prismaClient";
import { getAuthenticatedAdmin } from "../_utils/adminAuth";

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthenticatedAdmin(request);

    if (!auth.user) {
      return auth.errorResponse;
    }

    const {
      title,
      excerpt,
      slug,
      content,
      featuredImage,
      status,
      commentStatus,
      publishedAt,
    } =
      await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug and content are required" },
        { status: 400 },
      );
    }

    const normalizedStatus = status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
    const parsedPublishedAt = publishedAt ? new Date(publishedAt) : null;

    if (parsedPublishedAt && Number.isNaN(parsedPublishedAt.getTime())) {
      return NextResponse.json(
        { error: "Invalid publishedAt value" },
        { status: 400 },
      );
    }

    const normalizedPublishedAt =
      normalizedStatus === "PUBLISHED"
        ? parsedPublishedAt || new Date()
        : null;

    const post = await prismaClient.post.create({
      data: {
        title: String(title).trim(),
        slug: String(slug).trim(),
        content,
        excerpt: excerpt ? String(excerpt).trim() : null,
        authorId: auth.user.id,
        status: normalizedStatus,
        commentStatus: commentStatus !== false,
        publishedAt: normalizedPublishedAt,
        ...(featuredImage
          ? { featuredImage: String(featuredImage).trim() }
          : {}),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        status: true,
        createdAt: true,
        publishedAt: true,
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
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

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Post with this slug already exists",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create post",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    let isAdminRequest = false;
    const hasAuthHeader = Boolean(request.headers.get("authorization"));

    if (hasAuthHeader) {
      const auth = await getAuthenticatedAdmin(request);

      if (!auth.user) {
        return auth.errorResponse;
      }

      isAdminRequest = true;
    }

    const posts = await prismaClient.post.findMany({
      where: isAdminRequest ? {} : { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        featuredImage: true,
        authorId: true,
        status: true,
        commentStatus: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

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
