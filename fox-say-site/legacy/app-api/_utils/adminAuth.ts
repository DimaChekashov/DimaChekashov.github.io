import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "../../../lib/prisma/prismaClient";

type AuthResult =
  | {
      user: {
        id: number;
        username: string;
        email: string;
        displayName: string | null;
        avatarUrl: string | null;
        bio: string | null;
        role: "ADMIN";
        isActive: boolean;
      };
      errorResponse?: never;
    }
  | {
      user?: never;
      errorResponse: NextResponse;
    };

export async function getAuthenticatedAdmin(
  request: NextRequest,
): Promise<AuthResult> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      errorResponse: NextResponse.json(
        { error: "No token provided" },
        { status: 401 },
      ),
    };
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret",
    ) as JwtPayload & { userId?: number };

    if (!decoded.userId) {
      return {
        errorResponse: NextResponse.json(
          { error: "Invalid token payload" },
          { status: 401 },
        ),
      };
    }

    const user = await prismaClient.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || user.role !== "ADMIN" || !user.isActive) {
      return {
        errorResponse: NextResponse.json(
          { error: "Admin access required" },
          { status: 403 },
        ),
      };
    }

    return {
      user: {
        ...user,
        role: "ADMIN",
      },
    };
  } catch {
    return {
      errorResponse: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  }
}
