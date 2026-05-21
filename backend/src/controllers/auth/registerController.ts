import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import * as z from "zod";

type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(2).max(100),
});

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username }: RegisterRequest = req.body;

  try {
    const validatedData = registerSchema.parse({
      email,
      password,
      username,
    });

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        username: validatedData.username,
        email: validatedData.email,
        passwordHash: hashedPassword,
      },
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
      });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    return res.status(500).json({
      error: "Error registering user",
    });
  }
};
