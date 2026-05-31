import type { Response } from "express";
import * as z from "zod";
import { prisma } from "../../lib/prisma.js";
import type { AuthRequest } from "../../middleware/authMiddleware.js";

/*
for reference, this is the Pact model in Prisma schema:
enum PactStatus {
  PENDING
  ACTIVE
  COMPLETED
  FAILED
  DECLINED
}

enum StakeType {
  MONEY
  FORFEIT
  PUBLIC_SHAME
}

model Pact {
  id          Int         @id @default(autoincrement())
  creatorId   Int
  partnerId   Int?
  title       String
  description String
  deadline    DateTime
  status      PactStatus  @default(PENDING)
  stakeType   StakeType
  createdAt   DateTime    @default(now())
}
*/

const pactSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(6),
  deadline: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  stakeType: z.enum(["MONEY", "FORFEIT", "PUBLIC_SHAME"]),
  partnerUsername: z.string().min(2).max(50),
});

const updatePactSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  description: z.string().min(6).optional(),
  deadline: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
  stakeType: z.enum(["MONEY", "FORFEIT", "PUBLIC_SHAME"]).optional(),
});

export const createPact = async (req: AuthRequest, res: Response) => {
  const creatorId = req.user?.userId;
  const partnerUsername = req.body.partnerUsername;

  const partner = await prisma.user.findUnique({
    where: {
      username: partnerUsername,
    },
  });

  if (!partner) {
    return res.status(404).json({
      error: "Partner not found",
    });
  }
  const partnerId = partner.id;
  if (!creatorId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  if (partner.id === creatorId) {
    return res.status(400).json({
      error: "You cannot create a pact with yourself",
    });
  }

  try {
    const validatedData = pactSchema.parse(req.body);

    const newPact = await prisma.pact.create({
      data: {
        creatorId,
        partnerId: partnerId || null,
        title: validatedData.title,
        description: validatedData.description,
        deadline: new Date(validatedData.deadline),
        stakeType: validatedData.stakeType,
      },
    });

    return res.status(201).json(newPact);
  } catch (error: unknown) {
    console.error("[pact][create] error creating pact", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
      });
    }

    return res.status(500).json({
      error: "Error creating pact",
    });
  }
};

export const getPacts = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const pacts = await prisma.pact.findMany({
      where: {
        OR: [{ creatorId: userId }, { partnerId: userId }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(pacts);
  } catch (error) {
    console.error("[pact][getPacts] error fetching pacts", error);

    return res.status(500).json({
      error: "Error fetching pacts",
    });
  }
};

export const getPactById = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const pactId = Number(req.params.id);

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (isNaN(pactId)) {
    return res.status(400).json({
      error: "Invalid pact id",
    });
  }

  try {
    const pact = await prisma.pact.findFirst({
      where: {
        id: pactId,
        OR: [{ creatorId: userId }, { partnerId: userId }],
      },
    });

    if (!pact) {
      return res.status(404).json({
        error: "Pact not found",
      });
    }

    return res.json(pact);
  } catch (error) {
    console.error("[pact][getPactById] error fetching pact", error);

    return res.status(500).json({
      error: "Error fetching pact",
    });
  }
};

export const updatePact = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const pactId = Number(req.params.id);

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (isNaN(pactId)) {
    return res.status(400).json({
      error: "Invalid pact id",
    });
  }

  try {
    const validatedData = updatePactSchema.parse(req.body);

    const pact = await prisma.pact.findFirst({
      where: {
        id: pactId,
        creatorId: userId,
      },
    });

    if (!pact) {
      return res.status(404).json({
        error: "Pact not found or unauthorized",
      });
    }

    const updatedPact = await prisma.pact.update({
      where: {
        id: pactId,
      },
      data: {
        ...(validatedData.title && {
          title: validatedData.title,
        }),

        ...(validatedData.description && {
          description: validatedData.description,
        }),

        ...(validatedData.deadline && {
          deadline: new Date(validatedData.deadline),
        }),

        ...(validatedData.stakeType && {
          stakeType: validatedData.stakeType,
        }),
      },
    });

    return res.json(updatedPact);
  } catch (error: unknown) {
    console.error("[pact][updatePact] error updating pact", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
      });
    }

    return res.status(500).json({
      error: "Error updating pact",
    });
  }
};

export const deletePact = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const pactId = Number(req.params.id);

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (isNaN(pactId)) {
    return res.status(400).json({
      error: "Invalid pact id",
    });
  }

  try {
    const pact = await prisma.pact.findFirst({
      where: {
        id: pactId,
        creatorId: userId,
      },
    });

    if (!pact) {
      return res.status(404).json({
        error: "Pact not found or unauthorized",
      });
    }

    await prisma.pact.delete({
      where: {
        id: pactId,
      },
    });

    return res.json({
      message: "Pact deleted successfully",
    });
  } catch (error) {
    console.error("[pact][deletePact] error deleting pact", error);

    return res.status(500).json({
      error: "Error deleting pact",
    });
  }
};
