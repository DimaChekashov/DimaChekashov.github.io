import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../../lib/prisma/prismaClient";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, displayName } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields must be filled!" },
        { status: 400 }
      );
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with that email or username is already exist!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
        displayName: displayName || username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "User created!",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server Error!",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const users = await prismaClient.user.findMany({
      omit: {
        passwordHash: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: users,
        count: users.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching users:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}
