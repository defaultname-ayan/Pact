import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import * as z from "zod";
import { signJWT } from "../../lib/jwtToken";
type LoginRequest = {
  identifier?: string;
  email?: string;
  password: string;
};

const loginSchema = z.object({
  identifier: z.string().min(2).max(100),
  password: z.string().min(6),
});

export const loginUser = async (req: Request, res: Response) => {
  const { identifier, email, password }: LoginRequest = req.body;
  const loginIdentifier = identifier ?? email ?? "";

  console.log("[auth][login] request received", {
    identifier: loginIdentifier,
    hasPassword: Boolean(password),
  });

  try {
    const validatedData = loginSchema.parse({
      identifier: loginIdentifier,
      password,
    });

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.identifier },
          { username: validatedData.identifier },
        ],
      },
    });

    if (!user) {
      console.warn("[auth][login] user not found", {
        identifier: validatedData.identifier,
      });
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      console.warn("[auth][login] invalid password", {
        identifier: validatedData.identifier,
        userId: user.id,
      });
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }
    const token = await signJWT({ userId: user.id }, { expiresIn: "1h" });
    console.log("[auth][login] success", {
      userId: user.id,
      email: user.email,
      username: user.username,
    });
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.warn("[auth][login] validation error", {
        issues: error.issues,
      });
      return res.status(400).json({
        error: error.issues,
      });
    }

    console.error("[auth][login] unexpected error", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
