import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import * as z from "zod";
import { signJWT } from "../../lib/jwtToken";
type LoginRequest = {
  identifier: string;
  password: string;
};

const loginSchema = z.object({
  identifier: z.string().min(2).max(100),
  password: z.string().min(6),
});

export const loginUser = async (req: Request, res: Response) => {
  const { identifier, password }: LoginRequest = req.body;

  try {
    const validatedData = loginSchema.parse({
      identifier,
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
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }
    const token = await signJWT({ userId: user.id }, { expiresIn: "1h" });
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
      return res.status(400).json({
        error: error.issues,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
