import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("jwt-token");

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const decoded = jwt.verify(token.value, jwtSecret) as { userId: string; discordId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = {
        id: decoded.userId,
        discordId: user.discordId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Error verifying authentication:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
}
