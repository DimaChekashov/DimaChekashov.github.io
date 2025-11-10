import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../../lib/prisma/prismaClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          message: "User id is required!",
        },
        { status: 400 }
      );
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      omit: {
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User is not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          message: "User id is required!",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update user",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          message: "User id is required!",
        },
        { status: 400 }
      );
    }

    const existingUser = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User is not found!" },
        { status: 404 }
      );
    }

    const user = await prismaClient.user.delete({
      where: {
        id: userId,
      },
      omit: {
        passwordHash: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}
