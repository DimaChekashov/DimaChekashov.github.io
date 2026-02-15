import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../../../lib/prisma/prismaClient";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Post id is required!" },
        { status: 400 },
      );
    }

    const numericId = Number(id);

    const post = await prismaClient.post.findFirst({
      where: Number.isInteger(numericId) ? { id: numericId } : { slug: id },
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

export async function PUT() {}

export async function DELETE() {}
