import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prismaClient } from "../../../../lib/prisma/prismaClient";
import { getAuthenticatedAdmin } from "../../_utils/adminAuth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Post id is required!" },
        { status: 400 },
      );
    }

    const hasAuthHeader = Boolean(request.headers.get("authorization"));
    let isAdminRequest = false;

    if (hasAuthHeader) {
      const auth = await getAuthenticatedAdmin(request);

      if (!auth.user) {
        return auth.errorResponse;
      }

      isAdminRequest = true;
    }

    const isNumericId = /^\d+$/.test(id);
    const post = await prismaClient.post.findFirst({
      where: {
        ...(isNumericId ? { id: Number(id) } : { slug: id }),
        ...(isAdminRequest ? {} : { status: "PUBLISHED" }),
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post is not found!" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch post",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await getAuthenticatedAdmin(request);

    if (!auth.user) {
      return auth.errorResponse;
    }

    const { id } = await params;
    const numericId = Number(id);

    if (!id || !Number.isInteger(numericId)) {
      return NextResponse.json({ error: "Valid post id is required" }, { status: 400 });
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
    } = await request.json();

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

    const post = await prismaClient.post.update({
      where: { id: numericId },
      data: {
        title: String(title).trim(),
        slug: String(slug).trim(),
        content,
        excerpt: excerpt ? String(excerpt).trim() : null,
        status: normalizedStatus,
        commentStatus: commentStatus !== false,
        publishedAt: normalizedPublishedAt,
        featuredImage: featuredImage ? String(featuredImage).trim() : null,
      },
    });

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { success: false, error: "Post with this slug already exists" },
        { status: 409 },
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }

    console.log("Error updating post:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update post",
      },
      { status: 500 },
    );
  }
}

export async function DELETE() {}
