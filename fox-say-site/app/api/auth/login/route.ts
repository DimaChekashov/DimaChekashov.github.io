import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../../../lib/prisma/prismaClient";
import jwt from "jsonwebtoken";
import { verifyPassword } from "@/shared/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const user = await prismaClient.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Wrong username" }, { status: 401 });
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    const { passwordHash, ...userWithoutPassword } = user;
    void passwordHash;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
